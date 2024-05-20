"use client";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { CursorBorderGlowCard } from "@/components/ui/cursor-border-glow-card";
import { Input } from "@/components/ui/input";
import ProductivityComponent from "@/components/ui/master_light";
import { Button } from "@/components/ui/moving-border";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SendVerificationEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isdisabled , setIsdisabled] = useState<boolean>(true);

  const redirect = useRouter()

  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    firstname: "",
    uuid : "",
   
  });

  useEffect(() => {
    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
      setUserData(JSON.parse(loggedUser));
    }
    setIsdisabled(false)
   
  }, []);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    };
  
    const sendEmailToUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setIsdisabled(true);
      const response = await axios.post("/api/users/sendverificationemail", {email , userId : userData.userId});
      if (response.status !== 200) {
        toast.error("failed");
        throw new Error("There is an error");
      }

      const data = response.data;
      toast.success(data.message);
      redirect.push("/");
    } catch (error: any) {
      console.log("Fetching request failed", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsdisabled(false)
      setLoading(false);
    }
  }


  return (
    <div className="w-[100vw] h-[100vh] ">
      <ProductivityComponent
        bg_color="#00ff0000"
        light_ray1="#14dbe193"
        light_ray2="#0dcbf58a"
        light_ray3="#14dbe193"
      />
      <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
        <Link href={"/"} className="absolute top-14 right-48 z-50">
          <Button
            borderRadius="1rem"
            disabled={isdisabled}
            borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Home
          </Button>
        </Link>
        <Link href={`/profile/${userData.uuid}`} className="absolute top-14 right-12 z-50">
          <Button
            borderRadius="1rem"
            borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Profile
          </Button>
        </Link>
        <CursorBorderGlowCard
          className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32"
          bg_card_cursor_color="#0000004d"
          cursor_color="#14dae135"
          cursor_shadow="#14dae135"
          box_border="#14dae1"
          box_border_shadow="#14dae135"
        >
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Email Verification
          </h2>
          <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-cyan-500">
            enter your email address
          </p>

          <form className="my-8" onSubmit={sendEmailToUser}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">email address</Label>
              <Input
                id="email"
                placeholder="master_utsav@gmail.com"
                type="text"
                name="email"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </LabelInputContainer>
           

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
              type="submit" disabled={isdisabled}
            >
              {loading ? (
                <Spinner
                  size="24px"
                  bg_color="#212121"
                  spinner_color="#0edb9e"
                  className="w-[48px] h-[32px]"
                />
              ) : (
                "send email →"
              )}
              <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </CursorBorderGlowCard>
      </div>
    </div>
  );
};

export default SendVerificationEmail;
