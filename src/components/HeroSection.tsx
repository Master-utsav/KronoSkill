"use client"
import React from 'react';
import HeroSectionAfterLogin from './HeroSectionAfterLogin';
import HeroSectionBeforeLogin from './HeroSectionBeforeLogin';
import { useData } from '@/context/dataContext';

const HeroSection = () => {
  const {isLoggedIn} = useData();
  console.log(isLoggedIn)
  return (
    <>
      {isLoggedIn ? <HeroSectionAfterLogin /> : <HeroSectionBeforeLogin />}
    </>
  );
};

export default HeroSection;
