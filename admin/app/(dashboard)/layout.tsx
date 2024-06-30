import { Inter } from "next/font/google";
import "../globals.css";   
import { Navbar } from "../mycomponents/nav/navbar";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) 
  
  {
    return (
      <html lang="en">
        <body className={inter.className}> 
          <Navbar />
          {children} 
        </body>
      </html>
    );
  }