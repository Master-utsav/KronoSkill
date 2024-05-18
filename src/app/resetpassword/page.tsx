"use client";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import ProductivityComponent from "@/components/ui/master_light";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CursorBorderGlowCard } from "@/components/ui/cursor-border-glow-card";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function ResetPassword() {
    // const [token, setToken] = useState("");
    const [changed, setChanged] = useState(false);
    const [isClickedConfirmPassword , setIsClickedConfirmPassword] = useState(false);
    const [isClickedPassword , setIsClickedPassword] = useState(false);
    const router = useRouter();
    const [loading , setLoading] = useState(false);
    const [user , setUser] = useState({
      newpassword : "",
      confirmpassword : "",
      token : ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
    const changePassword = async() => {
    try {
      setLoading(true);
      console.log(user)
      const response =  await axios.post("/api/users/resetpassword",  user );
      setChanged(true);
      toast.success(response.data.message);
      router.push("/")
      
    } catch (error: any) {
      console.log("not able to update password", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    finally{
      setLoading(false);
    }
  };

async function sendNewPasswordAndToken() {
    console.log(user.token)
    if (user?.token.length > 0 && user?.newpassword.trim() !== "") {
      await changePassword();
    } else {
      toast.error("cannot changed");
    }
  }

  useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setUser((prevUser) => ({
        ...prevUser,
        token : (urlToken || ""),
      }));
  }, []);

  const handleEyePassword = (): void => {
    setIsClickedPassword(!isClickedPassword);
  };

  const handleEyeConfirmPassword = (): void => {
    setIsClickedConfirmPassword(!isClickedConfirmPassword);
  };
  
  return (
    <div className="w-[100vw] h-[100vh] ">
      <ProductivityComponent
        bg_color="#00ff0000"
        light_ray1="#10c57393"
        light_ray2="#0df5668a"
        light_ray3="#10c57393"
      />
      <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      {!changed ? (
       <CursorBorderGlowCard
       className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/20 dark:bg-black/40 mt-32"
       bg_card_cursor_color="#0000004d"
       cursor_color="#0df56635"
       cursor_shadow="#0df56635"
       box_border="#0edb9e"
       box_border_shadow="#0df56635"
     >
       <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
         Changed your Password
       </h2>
       <p className="text-neutral-600 text-center text-lg max-w-sm mt-2 dark:text-[#0edb9e]">
         enter your new password
       </p>

       <form className="my-8" onSubmit={sendNewPasswordAndToken}>
         <LabelInputContainer className="mb-1 relative">
           <Label htmlFor="newpassword">New password</Label>
           <Input
             id="newpassword"
             placeholder="••••••••"
             type={isClickedPassword ? "text" : "password"}
             name="newpassword"
             onChange={handleChange}
             value={user.newpassword}
             required
           />
           {isClickedPassword ?<VscEye  className="absolute right-2 top-7 text-xl cursor-pointer" onClick={handleEyePassword}/> : <VscEyeClosed  className="absolute right-2 top-7 text-xl cursor-pointer"  onClick={handleEyePassword}/> }
         </LabelInputContainer>
         <LabelInputContainer className="mb-4 relative">
         <Label htmlFor="confirmpassword">confirm password</Label>
           <Input
             id="confirmpassword"
             placeholder="••••••••"
             type={isClickedConfirmPassword ? "text" : "password"}
             name="confirmpassword"
             onChange={handleChange}
             value={user.confirmpassword}
             required
           />
           {isClickedConfirmPassword ?<VscEye  className="absolute right-2 top-7 text-xl cursor-pointer" onClick={handleEyeConfirmPassword}/> : <VscEyeClosed  className="absolute right-2 top-7 text-xl cursor-pointer"  onClick={handleEyeConfirmPassword}/> }
         </LabelInputContainer>
         <Link  onClick={sendNewPasswordAndToken}  href={`/resetpassword?token=${user.token}`}>
         <button
           className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
           type="submit" 
         >
           {loading ? (
             <Spinner
               size="24px"
               bg_color="#212121"
               spinner_color="#0edb9e"
               className="w-[48px] h-[32px]"
             />
           ) : (
             "Reset password →"
           )}
           <BottomGradient />
         </button>
         </Link>
        
         <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
       </form>
     </CursorBorderGlowCard>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="dark:text-[#0edb9e] text-4xl font-serif">
            password changed successfully Redirecting.....
            </h1>
            <Spinner size="100px" bg_color="#000000" spinner_color="#0edb9e" className="w-[180px] h-[120px]"/>
        </div>
      )}
    </div>
    </div>
  );
}
