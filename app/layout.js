import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { getAuthenticatedAppForUser } from "@/firebase/firebase";

export const dynamic = "force-dynamic"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz Me",
  description: "AI Generated Quizzes To Help You Ace Your Exams!",
};

export default async function RootLayout({ children }) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header initialUser={currentUser?.toJSON()}/>
        {children}
      </body>
    </html>
  );
}
