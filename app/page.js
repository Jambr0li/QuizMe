"use client";

import PromptForm from "./components/PromptForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
      <h1 className="text-6xl mb-16 mt-title">Quiz Me</h1>
      <div className="w-full flex flex-col items-center min-h-min">
        <p className="text-3xl mb-8">What is your exam about?</p>
          <PromptForm />
      </div>
      
    </main>
  );
}

async function requestQuiz(prompt) {
  result = await fetch("/api/chat-gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({prompt,}),
  });

  const data = await result.json();
  return data;
}