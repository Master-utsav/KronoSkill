
import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import TestimonialCards from "@/components/TestimonialCards";
import WhyChooseUs from "@/components/WhyChooseUs";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import Instructor from "@/components/Instructor";
import Footer from "@/components/Footer";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";


export default function Home() {
  return (
    <TracingBeam className="px-6">
      <main className="min-h-screen bg-black/[0.96] antialiased bg-dot-white/[0.1]">
        <HeroSection />
        <FeaturedCourses />
        <WhyChooseUs />
        <TestimonialCards />
        <UpcomingWebinars />
        <Instructor />
        <Footer />
      </main>
    </TracingBeam>
  );
}
