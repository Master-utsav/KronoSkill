"use client"
import ProductivityComponent from '@/components/ui/master_light'
import React from 'react'
import { BottomGradient } from '@/components/ui/BottomGradient'
import Link from 'next/link'
import { LabelInputContainer } from '@/components/ui/LabelInputContainer'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { CursorBorderGlowCard } from '@/components/ui/cursor-border-glow-card'

const page = () => {
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className='w-[100vw] h-[100vh]'>
      <ProductivityComponent bg_color="#00ff0000" light_ray1="#193627ff" light_ray2="#0bdc9d7b" light_ray3="#1f8764ad" />
      <div className="w-[100vw] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] h-[100vh]  bg-white/0 dark:bg-black/0 overflow-x-hidden  ">
        <CursorBorderGlowCard className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32" bg_card_cursor_color='#0000004d' cursor_color='#0bdc9d2b' cursor_shadow='#0bdc9d2b' box_border='#0BDC9Cff' box_border_shadow='#193627ff'
        >
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Welcome to Shakambari Avenue
        </h2>
        <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-[#0BDC9Cff]">
          Login Now
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
              <Label  htmlFor="identity">username or email</Label>
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
      </CursorBorderGlowCard>
    </div>
    </div>
  )
}

export default page
