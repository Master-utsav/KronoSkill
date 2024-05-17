"use client";
import ProductivityComponent from "@/components/ui/master_light";
import React, { useState } from "react";
import { BottomGradient } from "@/components/ui/BottomGradient";
import Link from "next/link";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/moving-border";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { CursorBorderGlowCard } from "@/components/ui/cursor-border-glow-card";


interface UserLogin {
    identity: string,
    password: string,

}

const Login = () => {
  const [user, setUser] = useState<UserLogin>({
    identity: "",
    password: "",
  })

  const [loading, setLoading] = useState(false);
  const redirect = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user);

      if (response.status !== 200) {
        toast.error("login failed");
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
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] ">
      <ProductivityComponent bg_color="#00ff0000" light_ray1="#ff57eb5b" light_ray2="#c058f88f" light_ray3="#2134db4d" />
      <div className="w-[100vw] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] h-[100vh]  bg-white/0 dark:bg-black/0 overflow-x-hidden overflow-y-hidden ">
        <Link href={"/"} className="absolute top-14 right-44 z-50">
          <Button
            borderRadius="1rem"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Home
          </Button>
        </Link>
        <Link href={"/signup"} className="absolute top-14 right-8 z-50">
          <Button
            borderRadius="1rem"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            signup
          </Button>
        </Link>
        <CursorBorderGlowCard className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32" bg_card_cursor_color='#0000004d' cursor_color='#ae14fb2e' cursor_shadow='#ae14fb26' box_border='#ae14fb' box_border_shadow='#ae14fb1a'>
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome to Shakambari Avenue
          </h2>
          <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-cyan-500">
            Login Now
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="identity">username or email</Label>
              <Input id="identity" placeholder="master_utsav" type="text" name="identity" value={user.identity} onChange={handleChange}/>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" name="password" value={user.password} onChange={handleChange}/>
              <Link
                href={"/signup"}
                className=" text-sm hover:underline text-indigo-500 hover:text-cyan-500"
              >
                {"Dont't have an account?"}
              </Link>
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              {loading? <Spinner size="24px" bg_color="#212121" spinner_color="cyan" className="w-[48px] h-[32px] "/> : "Login →" } 
              <BottomGradient />
            </button>
            <Link
              href={"/forgotpassword"}
              className=" text-sm hover:underline text-indigo-500 hover:text-cyan-500 flex justify-end mt-1"
            >
              {"Forgot password"}
            </Link>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </CursorBorderGlowCard>
      </div>
    </div>
  );
};

export default Login;
