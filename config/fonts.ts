import { Fira_Code as FontInter, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
});
