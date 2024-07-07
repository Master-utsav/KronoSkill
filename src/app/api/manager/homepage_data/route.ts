import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/course";
import Instructor from "@/models/instructors";
import Playlists from "@/models/playlist";
import Quotes from "@/models/quote";
import Skill from "@/models/skill";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
      const [courses, instructors, playlists, quotes, skills] = await Promise.all([
        Course.find().lean(), // Use lean() to get plain JavaScript objects
        Instructor.find().lean(),
        Playlists.find().lean(),
        Quotes.find().lean(),
        Skill.find().lean(),
      ]);
  
      return NextResponse.json({
        data: {
          courses,
          instructors,
          playlists,
          quotes,
          skills,
        },
        message: "Data fetched successfully",
      });
    } catch (error) {
      console.error(error);
      return  NextResponse.json({ error: "Internal server error" });
    }
  }