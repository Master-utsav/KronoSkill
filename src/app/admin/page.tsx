import React from 'react'

interface Course_Skill_Set_Body {
    courses: string[],
    skills?: string[][],
    description?: string[],
}

interface Qoute_Body{
        quote : string,
        name : string,
        title : string
}

interface Instructor_Body{
    channelName? : string,
    image? : string,
    skill : string,
    channelId : string,
    channelLink?: string
}

interface Playlist_Body{
    playlistUrl : string,
    customDescription?: string, // if description of that playlist not provided , 
    skill : string[];
}

interface SkillDescription_Body { // if we just want to add additional skill section
    skill: string;
    description: string;
  }

export const Admin = () => {
  return (
    <section>
       TODO : we have to create a full basic form here 
       fields of Qoute_Body ,  Course_Skill_Set_body , Instructor_Body , Playlist_Body , SkillDescription_Body
    </section>
  )
}

