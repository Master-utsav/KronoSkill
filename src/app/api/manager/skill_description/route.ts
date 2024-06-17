import { connect } from "@/dbConfig/dbConfig";
import Skill from "@/models/skill";
import { NextRequest, NextResponse } from "next/server";

connect();

interface SkillDescription {
  skill: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const requestBody:
      | SkillDescription
      | SkillDescription[] = await request.json();

    // Ensure we handle both single and multiple skill descriptions
    const skillDescriptions = Array.isArray(requestBody)
      ? requestBody
      : [requestBody];

    // Check for duplicate skills
    const skillNames = skillDescriptions.map(({ skill }) => skill);
    const skillAlreadyPresent = await Skill.find({
      skill: { $in: skillNames },
    });

    if (skillAlreadyPresent.length > 0) {
      const existingSkillsNames = skillAlreadyPresent.map(
        (course) => course.skill
      );
      return NextResponse.json(
        { error: "Skills already exist", existingSkill: existingSkillsNames },
        { status: 400 }
      );
    }

    // Insert new skill documents
    const newSkills = await Skill.insertMany(skillDescriptions);

    return NextResponse.json(
      { newSkills, message: "Skills uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const skills = await Skill.find();

    return NextResponse.json(
      { skills, message: "fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
