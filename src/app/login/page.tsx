"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="w-[100vw] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] h-[100vh]  bg-white/40 dark:bg-black overflow-x-hidden overflow-y-hidden">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32 ">
        <Spotlight
          className="-top-40 left-0 md:left-80 md:top-10"
          fill="skyblue"
        />
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Welcome to Music Academy
        </h2>
        <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-cyan-500">
          Login Now
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="identity">username or email</Label>
            <Input id="identity" placeholder="master_utsav" type="text" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
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
            Login &rarr;
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
      </div>
    </div>
  );
}
