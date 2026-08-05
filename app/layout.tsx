import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geist = Geist({
  variable: "--font-geist",
  subsets:["latin"],
});


export const metadata: Metadata = {
  title:"CyberShield XDR",
  description:
  "AI Powered Threat Intelligence & Security Operations Platform",
};


export default function RootLayout({
 children,
}:{
 children:React.ReactNode;
}){

 return(
  <html lang="en">

    <body className={geist.variable}>

      {children}

      <Toaster
        position="top-right"
        theme="dark"
      />

    </body>

  </html>
 );

}