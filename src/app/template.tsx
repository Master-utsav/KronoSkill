import Navbar from "@/components/Navbar";
import "./globals.css";

export default function Template({ children }: { children: React.ReactNode }) {
  return (

        <div className="animate-zoomin ">{children}</div>
  
  );
}
