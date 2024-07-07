import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/course";
import { NextRequest, NextResponse } from "next/server";

connect();

interface RequestBody {
    courses: string[];
    skills?: string[][];
    description?: string[];
}

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json() as RequestBody;

        const { courses, skills , description } = requestBody;

        // Check if courses is an array or a single string
        const coursesToInsert = Array.isArray(courses) ? courses : [courses];

        // Check if any of the courses already exist
        const existingCourses = await Course.find({ course: { $in: coursesToInsert } });

        if (existingCourses.length > 0) {
            const existingCourseNames = existingCourses.map(course => course.course);
            return NextResponse.json({ error: 'Courses already exist', existingCourses: existingCourseNames }, { status: 400 });
        }

        // Prepare the array of objects to insert
        const coursesData = coursesToInsert.map((courseName, index) => ({
            description: description ? (description[index] || []) : [],
            course: courseName,
            skills: skills ? (skills[index] || []) : []  // Assign skills if provided, otherwise an empty array
        }));

        // Insert new course documents
        const newCourses = await Course.insertMany(coursesData);

        return NextResponse.json({ newCourses, message: 'Courses uploaded successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


