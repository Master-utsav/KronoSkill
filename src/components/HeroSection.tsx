"use client"
import React, { useEffect, useState } from 'react'
import HeroSectionAfterLogin from './HeroSectionAfterLogin';
import HeroSectionBeforeLogin from './HeroSectionBeforeLogin';

interface User {
    userId: string;
    username: string;
  }

const HeroSection = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<User | null>(null);
  useEffect(() => {
    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
      setIsLoggedIn(JSON.parse(loggedUser));
    }
  }, []);
  return (
    <>
      {(isLoggedIn?.userId && isLoggedIn?.username) ? <HeroSectionAfterLogin/> : <HeroSectionBeforeLogin/>}
    </>
  )
}

export default HeroSection
