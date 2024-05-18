"use client";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";


interface User{
  userId : string,
}
export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verfied, setVerified] = useState(false);
    const router = useRouter();
    
    const [isLoggedIn, setIsLoggedIn] = useState<User | null>(null);
    useEffect(() => {

      const loggedUser = localStorage.getItem("logged User");
      if (loggedUser) {
        setIsLoggedIn(JSON.parse(loggedUser));
      }
    }, []);

    const verfiyUserEmail = async() => {
    try {

      const response =  await axios.post("/api/users/verifyemail", { token } );
      setVerified(true);
      toast.success(response.data.message);
      if(isLoggedIn){
        router.push("/")
      }
      else{
        router.push("/login")
      }
      
    } catch (error: any) {
      console.log("verification failed", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

async function handelClick() {
    console.log(token)
    if (token.length > 0) {
      await verfiyUserEmail();
    } else {
      toast.error("Cannot redirecting");
    }
  }

  useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      console.log(urlToken)
      setToken(urlToken || "");
    // const { query } = router;
    // const urlToken = query.token
    // setToken(urlToken);
  }, []);
  //   useEffect(() => {
  //     if (token.length > 0) {
  //       VerifyEmailPage();
  //     }
  //   }, [token]);
  return (
    <div className="bg-dot-white/[0.2] w-[100vw] h-[100vh] flex justify-center items-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="skyblue"
      />
      {!verfied ? (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="dark:text-cyan-500 text-6xl font-serif">
            Verify Your Email
          </h1>
          <Link onClick={handelClick} href={`/verifyemail?token=${token}`}>
            <Button
              borderRadius="2rem"
              borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]"
              className="bg-white dark:bg-slate-900/60 text-4xl h-32 w-64 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Verify Email
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="dark:text-cyan-500 text-4xl font-serif">
            Verified successfully Redirecting.....
            </h1>
            <Spinner size="100px" bg_color="#000000" spinner_color="cyan" className="w-[180px] h-[120px]"/>
        </div>
      )}
    </div>
  );
}
