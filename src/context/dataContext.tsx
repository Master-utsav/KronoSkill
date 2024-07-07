"use client"
import axios from 'axios';
import React from 'react';

interface UserData  {
  userId : string,
  username : string,
  firstname : string,
  uuid : string,
}

interface Course {
  _id: string;
  course: string[];
  skills: string[];
  description: string[];
}

interface Quote {
  name: string;
  quote: string;
  title: string;
}

interface PlaylistContent {
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
}
interface SkillInterface {
  skill: string;
  description: string;
}

interface Playlist {
  playlistUrl: string;
  averageRating: number;
  thumbnail: string;
  title: string;
  description: string;
  skill: string[];
  rating: { rateNumber: number }[];
  userHasRated: boolean;
  userRated: number;
  ratedUser: number;
  isBookMarked: boolean;
}

interface Instructor {
  id: number;
  channelLink: string;
  channelName: string;
  image: string;
  skill: string[];
}

interface DataContextProps {
  data: {
    featuredCourses?: Course[];
    quotes?: Quote[];
    playlistHome?: PlaylistContent[];
    instructor?: Instructor[];
    NavbarCourses?: Course[];
    playlist?: Playlist[];
    skills?: SkillInterface[];
  };
  userdata?: UserData ;
  isLoggedIn: boolean;
  loading: boolean;
}

const DataContext = React.createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<DataContextProps["data"]>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userdata , setUserdata] = React.useState<UserData>();
  const [isLoggedIn , setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get('/api/manager/homepage_data')
        const data = res.data.data
        console.log(res);
        const featuredCourses: Course[] = data.courses;
        if (!Array.isArray(featuredCourses)) {
          console.log('Data fetched from /api/manager/homepage_data is not in expected format:', featuredCourses);
        }

        const NavbarCourses: Course[] = featuredCourses.slice().reverse();
  
        const playlistData = data;
        let playlistHome: PlaylistContent[] = [];
        if (playlistData && playlistData.playlists && Array.isArray(playlistData.playlists)) {
          playlistHome = playlistData.playlists.slice(0, 8);
        }

        const playlist: Playlist[] = playlistData.playlists;

        const quotes: Quote[] = data.quotes;
      
        const skills: SkillInterface[] = data.skills;

        const InstructorArraydata = data.instructors;
        const instructor: Instructor[] = InstructorArraydata.map((item: Instructor, index: number) => ({
          id: index,
          channelLink: item.channelLink,
          channelName: item.channelName,
          image: item.image,
          skill: item.skill,
        }));

        setData({ featuredCourses, NavbarCourses, quotes, playlistHome, instructor , playlist , skills});
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setLoading(false);
      }
    };
    
    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
      let data = JSON.parse(loggedUser);
      setUserdata(data);
      if(data.userId && data.username ){
        setIsLoggedIn(true);
      }
    }
    else{
      setIsLoggedIn(false);
    }
    
    fetchData();
  }, []);
  
  return (
    <DataContext.Provider value={{ data, loading , userdata , isLoggedIn  }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};