"use client"
import React from 'react'
import HeroSectionAfterLogin from './HeroSectionAfterLogin';
import HeroSectionBeforeLogin from './HeroSectionBeforeLogin';
import { useData } from '@/context/dataContext';

const HeroSection = () => {
  const {isLoggedIn} = useData();
  return (
    <>
      {(isLoggedIn) ? <HeroSectionAfterLogin/> : <HeroSectionBeforeLogin/>}
    </>
  )
}

export default HeroSection
