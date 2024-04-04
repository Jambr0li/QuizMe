"use client"
import React from 'react';
import { useSearchParams } from "next/navigation";

export default function AccessQuiz(){

    //TODO: Pass in params for unique document associated w/ user,
    //      then query the database.
    
    const searchParams = useSearchParams()
    const prompt = searchParams.get('prompt')

    return(
        <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
            <p>{prompt}</p>
            <iframe src="/output.pdf" width="100%" height="1200px" />
        </main>
    )
}