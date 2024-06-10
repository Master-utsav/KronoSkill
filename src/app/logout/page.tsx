"use client";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { CursorBorderGlowCard } from "@/components/ui/cursor-border-glow-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductivityComponent from "@/components/ui/master_light";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormState } from "react-hook-form"
import { z } from "zod";


interface userLogout {
  email: string;
}

export const schema = z
   .object({
    email: z.string().min(1, "required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address").email({ message: "Please enter a valid email address" }),
   })
const LogoutPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isdisabled , setIsdisabled] = useState<boolean>(true);

  const { register, handleSubmit , formState : {errors}} = useForm<userLogout>({
    resolver: zodResolver(schema),
    mode: "all",
  })
  
    const redirect = useRouter()

    const [userData, setUserData] = useState({
      userId: "",
      username: "",
      firstname: "",
      userUUID : "",
    });
  
    useEffect(() => {
      const loggedUser = localStorage.getItem("logged User");
      if (loggedUser) {
        setUserData(JSON.parse(loggedUser));
      }
      setIsdisabled(false);
    }, []);

      const emailSendToLogoutRoute : SubmitHandler<userLogout> = async (user: userLogout) => {
      
      try {
        setIsdisabled(true);
        setLoading(true);
        const response = await axios.post("/api/users/logout", {email : user.email , userId : userData.userId });
        if (response.status !== 200) {
          toast.error("failed");
          throw new Error("There is an error");
        }
  
        const data = response.data;
        toast.success(data.message);
        localStorage.removeItem("logged User");
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
        setIsdisabled(false);
      }
    }
  
  return (
    <div className="w-[100vw] h-[100vh] ">
      <ProductivityComponent
        bg_color="#00ff0000"
        light_ray1="#f53e2d93;"
        light_ray2="#f08d138a"
        light_ray3="#f53e2d93"
      />
      <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
        <CursorBorderGlowCard
          className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32"
          bg_card_cursor_color="#0000004d"
          cursor_color="#ef444430"
          cursor_shadow="#ef444430"
          box_border="#ef4444"
          box_border_shadow="#ef444430"
        >
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Really want to <span className="text-red-500">logout</span> ?
          </h2>
          <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-red-400">
            enter your email 
          </p>

          <form className="my-8 relative" onSubmit={handleSubmit(emailSendToLogoutRoute)} >
            <LabelInputContainer className="mb-5 relative">
              <Label htmlFor="email">email address</Label>
              <Input
                {...register("email")}
                placeholder="master_utsav@gmail.com"
                type="text"
                name="email"
              />
              {errors.email && <p className="text-[12px] text-red-600 absolute -bottom-4 right-1">{errors.email?.message}</p>}
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit" disabled={isdisabled}
            >
              {loading ? (
                <Spinner
                  size="24px"
                  bg_color="#212121"
                  spinner_color="#ef4444"
                  className="w-[48px] h-[32px]"
                />
              ) : (
                "logout →"
              )}
              <BottomGradient />
            </button>
            <Link
                href={"/"}
                className=" text-sm hover:underline text-blue-500 hover:text-cyan-500 absolute right-0 bottom-2"
              >
                {"Back to home page"}
              </Link>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </CursorBorderGlowCard>
      </div>
    </div>
  );
};

export default LogoutPage;
