
import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import Quotes from "@/components/Quotes";
import PlaylistHome from "@/components/PlaylistHome";
import PremiumCourses from "@/components/PremiumCourse";
import Instructor from "@/components/Instructor";
import Footer from "@/components/Footer";
import React  from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";


export default function Home() {
 
  return (
    <TracingBeam className="px-6">
      <main className="min-h-screen antialiased ">
        <HeroSection />
        <FeaturedCourses />
        <PlaylistHome/>
        <Quotes />
        <Instructor />
        <PremiumCourses />
        <Footer />
      </main>
    </TracingBeam>
  );
}
