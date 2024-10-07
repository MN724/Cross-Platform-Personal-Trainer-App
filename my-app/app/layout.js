import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

// Root layout of the app
export default function RootLayout({ children }) {
  return (
    <html lang="en">
       
      <body className={inter.className}>
        <ul className="nav-bar">
          <li className="left-nav"><Link href="/">Filters</Link></li>
          <li className="right-nav"><Link href="/map">Find Team</Link></li>
          <li className="right-nav"><Link href="/list">List</Link></li>
          <li className="right-nav"><Link href="/calendar">Calendar</Link></li>
          <li className="right-nav"><Link href="/">Home</Link></li>
        </ul> 
        {children}
      </body>
    </html>
  );
}
