"use client";
import ProductivityComponent from "@/components/ui/master_light";
import React, { useEffect, useState } from "react";
import { BottomGradient } from "@/components/ui/BottomGradient";
import Link from "next/link";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/moving-border";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import  CursorBorderGlowCard from "@/components/ui/cursor-border-glow-card";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

interface UserLogin {
  identity: string;
  password: string;
}

export const schema = z
  .object({
    identity: z
      .string()
      .min(1, "required"),
    password: z
      .string()
      .min(1, "required")
      .regex(/^\S+$/, "spaces are not allowed in the password")
      .min(6, "not a valid password"),
  })
  .refine(
    (schema) =>
      ((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(schema.identity) || (/^[a-zA-Z0-9_]+$/).test(schema.identity)),
    {
      message: "must be a valid email or username",
      path: ["identity"],
    }
  );

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isClickedPassword, setIsClickedPassword] = useState(false);
  const [isdisabled, setIsdisabled] = useState<boolean>(true);

  const redirect = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UserLogin>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const userUUID = uuidv4();
  useEffect(() => {
    setIsdisabled(false);
  }, []);

  const submit: SubmitHandler<UserLogin> = async (user: UserLogin) => {
    console.log(user);
    try {
      setIsdisabled(true);
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.status !== 200) {
        toast.error("login failed");
        throw new Error("There is an error");
      }

      const data = response.data;
      console.log(data);
      toast.success(data.message);
      localStorage.setItem(
        "logged User",
        JSON.stringify({
          userId: data.userId,
          username: data.username,
          firstname: data.firstname,
          uuid: userUUID,
          isVerify: data.isVerify,
        })
      );
      redirect.push("/");
    } catch (error : any) {
      console.log("Fetching request failed", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
      setIsdisabled(false);
    }
  };

  const handleEyePassword = (): void => {
    setIsClickedPassword(!isClickedPassword);
  };

  return (
    <div className="w-[100vw] h-[100vh] ">
      <ProductivityComponent
        bg_color="#00000000"
        light_ray1="#ff57eb5b"
        light_ray2="#c058f88f"
        light_ray3="#2134db4d"
      />
      <div className="w-[100vw] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] h-[100vh]  bg-white/0 dark:bg-black/[0] overflow-x-hidden overflow-y-hidden ">
        <Link href={"/"} className="absolute top-14 right-44 z-50">
          <Button
            borderRadius="1rem"
            disabled={isdisabled}
            borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Home
          </Button>
        </Link>
        <Link href={"/signup"} className="absolute top-14 right-8 z-50">
          <Button
            borderRadius="1rem"
            disabled={isdisabled}
            borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            signup
          </Button>
        </Link>
        <CursorBorderGlowCard
          className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32"
          bg_card_cursor_color="#0000004d"
          cursor_color="#ae14fb2e"
          cursor_shadow="#ae14fb26"
          box_border="#ae14fb"
          box_border_shadow="#ae14fb1a"
        >
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome to Music Academy
          </h2>
          <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-[#d367f1]">
            Login Now
          </p>

          <form className="my-8" onSubmit={handleSubmit(submit)}>
            <LabelInputContainer className="mb-4 relative">
              <Label htmlFor="identity">username or email</Label>
              <Input
                {...register("identity")}
                placeholder="master_utsav"
                type="text"
                name="identity"
              />
              {errors.identity && (
                <p className="text-[12px] text-red-600 absolute -bottom-4 right-1">
                  {errors.identity?.message}
                </p>
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                placeholder="••••••••"
                type={isClickedPassword ? "text" : "password"}
                name="password"
              />
              {errors.password && (
                <p className="text-[12px] text-red-600 absolute bottom-2 right-1">
                  {errors.password?.message}
                </p>
              )}
              {isClickedPassword ? (
                <VscEye
                  className="absolute right-2 top-7 text-xl cursor-pointer"
                  onClick={handleEyePassword}
                />
              ) : (
                <VscEyeClosed
                  className="absolute right-2 top-7 text-xl cursor-pointer"
                  onClick={handleEyePassword}
                />
              )}
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
              disabled={isdisabled}
            >
              {loading ? (
                <Spinner
                  size="24px"
                  bg_color="#212121"
                  spinner_color="rgb(168 85 247)"
                  className="w-[48px] h-[32px]"
                />
              ) : (
                "Login →"
              )}
              <BottomGradient />
            </button>
            <Link
              href={"/forgotpassword"}
              className=" text-sm hover:underline text-indigo-500 hover:text-cyan-500 flex justify-end mt-1 cursor-pointer"
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
