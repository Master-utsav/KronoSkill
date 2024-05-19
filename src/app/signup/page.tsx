"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import {Spinner} from "@/components/ui/spinner";
import { Button } from "@/components/ui/moving-border";
import { CursorBorderGlowCard } from "@/components/ui/cursor-border-glow-card";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

interface User {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    confirmpassword: string,
}
export default function SignUp() {
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  })
  const [loading, setLoading] = useState(false);
  const redirect = useRouter()

  const [isClickedConfirmPassword , setIsClickedConfirmPassword] = useState(false);
  const [isClickedPassword , setIsClickedPassword] = useState(false);
  const [isdisabled , setIsdisabled] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsdisabled(false)
  } , []);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)
    try {
      setIsdisabled(true);
      setLoading(true)
      const response = await axios.post("/api/users/signup", user);

      if (response.status !== 200) {
        toast.error("Sign up failed");
        throw new Error("There is an error");
      }

      const data = response.data;
      toast.success(data.message);
      toast.success(data.message2);
      redirect.push("/login");

    } catch (error: any) {
      console.log("Fetching request failed", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setIsdisabled(false);
    }
  };
  
  const handleEyePassword = (): void => {
    setIsClickedPassword(!isClickedPassword);
  };

  const handleEyeConfirmPassword = (): void => {
    setIsClickedConfirmPassword(!isClickedConfirmPassword);
  };


  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <div className="w-[100vw] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] h-[100vh] overflow-x-hidden overflow-y-hidden bg-white/40 dark:bg-black relative">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="skyblue"
        />
          <Link href={"/"} className="absolute top-14 right-44 z-50">
          <Button
            disabled={isdisabled}
            borderRadius="1rem"
            borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Home
          </Button>
        </Link>
      <Link href={"/login"} className="absolute top-14 right-8 z-50" >
          <Button
            borderRadius="1rem"
            disabled={isdisabled}
            borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            login
          </Button>
        </Link>
        <CursorBorderGlowCard className="max-w-md w-full mx-auto max-h-[90%] rounded-none md:rounded-2xl p-4 md:py-2 md:px-8 shadow-input bg-white/20 dark:bg-black/40 mt-16 " bg_card_cursor_color='#0000004d' cursor_color='#14d4fb2e' cursor_shadow='#14ecfb26' box_border='#08c2f5' box_border_shadow='#08c2f51a'>
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome to Shakambari Avenue
          </h2>
          <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-cyan-500">
            Sign up now
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input required id="firstname" placeholder="Utsav" type="text" onChange={handleChange} name="firstname" value={user.firstname} />
              </LabelInputContainer>

              <LabelInputContainer className="flex flex-col space-y-2 w-full">
                <Label htmlFor="lastname">Last name</Label>
                <Input required id="lastname" placeholder="Jaiswal" type="text" onChange={handleChange} name="lastname" value={user.lastname} />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="info@master_cafe.com"
                type="email"
                onChange={handleChange}
                name="email"
                value={user.email}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">username</Label>
              <Input required id="username" placeholder="master_utsav" type="text" onChange={handleChange} name="username" value={user.username} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 relative">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" placeholder="••••••••" type={isClickedPassword ? "text" : "password"} onChange={handleChange} name="password" value={user.password} />
              {isClickedPassword ?<VscEye  className="absolute right-2 top-7 text-xl cursor-pointer" onClick={handleEyePassword}/> : <VscEyeClosed  className="absolute right-2 top-7 text-xl cursor-pointer" onClick={handleEyePassword}/> }
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 relative">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                id="confirmpassword"
                placeholder="••••••••"
                type={isClickedConfirmPassword ? "text" : "password"}
                onChange={handleChange} name="confirmpassword" value={user.confirmpassword}
                required
              />
              {isClickedConfirmPassword ?<VscEye  className="absolute right-2 top-7 text-xl cursor-pointer" onClick={handleEyeConfirmPassword}/> : <VscEyeClosed  className="absolute right-2 top-7 text-xl cursor-pointer"  onClick={handleEyeConfirmPassword}/> }
              <Link
                href={"/login"} 
                className=" text-sm hover:underline text-indigo-500 hover:text-cyan-500"
              >
                {"Already have an account ?"}
              </Link>
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit" disabled={isdisabled}
            >
              {loading ?<Spinner size="24px" bg_color="#212121" spinner_color="cyan" className="w-[48px] h-[32px] "/>: "Sign up →"}
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

            {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
          </form>
        </CursorBorderGlowCard>
      </div>
    </div>
  );
}
