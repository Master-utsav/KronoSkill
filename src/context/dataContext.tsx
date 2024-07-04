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
    qoutesData?: Quote[];
    playlistHome?: PlaylistContent[];
    instructor?: Instructor[];
    NavbarCourses?: Course[];
    playlist?: Playlist[];
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
        const [res1, res2, res3, res4] = await Promise.all([
          axios.get('/api/manager/course_skills_set'),
          axios.get("/api/manager/playlist"),
          axios.get('/api/manager/quote'),
          axios.get('/api/manager/instructors'),
        ]);

        const featuredCourses: Course[] = res1.data.courses;
        if (!Array.isArray(featuredCourses)) {
          console.log('Data fetched from /api/manager/course_skills_set is not in expected format:', featuredCourses);
        }

        const NavbarCourses: Course[] = featuredCourses.slice().reverse();
  
        const playlistData = res2.data;
        let playlistHome: PlaylistContent[] = [];
        if (playlistData && playlistData.playlists && Array.isArray(playlistData.playlists)) {
          playlistHome = playlistData.playlists.slice(0, 8);
        }

        const playlist: Playlist[] = playlistData.playlists;
 

        const quotes = res3.data;
        let qoutesData: Quote[] = [];
        if (quotes && quotes.quotes && Array.isArray(quotes.quotes)) {
          qoutesData = quotes.quotes;
        }

        const InstructorArraydata = res4.data.instructors;
        const instructor: Instructor[] = InstructorArraydata.map((item: Instructor, index: number) => ({
          id: index,
          channelLink: item.channelLink,
          channelName: item.channelName,
          image: item.image,
          skill: item.skill,
        }));

        setData({ featuredCourses, NavbarCourses, qoutesData, playlistHome, instructor , playlist });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setLoading(false);
      }
    };
    
    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
      const data = JSON.parse(loggedUser);
      setUserdata(JSON.parse(loggedUser));
      if(data.userId && data.username){
        setIsLoggedIn(true);
      }
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