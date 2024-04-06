"use client"

import React, { useState, useEffect} from "react"
import Quiz from "../components/Quiz.jsx"

export default function InteractiveQuiz() {
    const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const[score, setScore] = useState(0)
    const [testQuestions, setTestQuestions] = useState(null)


    useEffect(() => {
        const sessionData = sessionStorage.getItem('quiz-contents')
        if (sessionData) {
            setTestQuestions(JSON.parse(sessionData))
        }
    },[])

    // console.log(testQuestions)

    if (!testQuestions) return (
        <p>Loading...</p>
    )

    const handleAnswer = (isCorrect) => {
    if (isCorrect){
        console.log("updating score... was " + score)
        setScore(score + 1)
    }
    console.log("score is now " + score)
    const nextQuestionIndex = currentQuestionIndex + 1
    if (nextQuestionIndex < testQuestions.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex)
    } else {
        document.getElementById("question-counter").classList.add("hidden")
        document.getElementById("post-quiz").classList.remove("hidden")
        document.getElementById("quiz-questions").classList.add("hidden")
    }
    };

    const resetQuiz = () => {
    setScore(0)
    setCurrentQuestionIndex(0)
    document.getElementById("question-counter").classList.remove("hidden")

    document.getElementById("post-quiz").classList.add("hidden")
    document.getElementById("quiz-questions").classList.remove("hidden")

    }

    if (!testQuestions) return (
        <p className="text-2xl text-black">Something's missing...</p>
    )
    else return (
    <main className="bg-gray-300">
        <div id="question-counter" className="pl-24 pt-32">
            <p>Question {currentQuestionIndex + 1} / {testQuestions.questions.length}</p>
        </div>
        <div className="flex flex-col justify-center p-24 bg-gray-300">
        <div className="bg-white p-10 rounded-3xl">
            <div id="quiz-questions">
            {testQuestions && currentQuestionIndex < testQuestions.questions.length && (
                <Quiz 
                question={testQuestions.questions[currentQuestionIndex]}
                onAnswer={handleAnswer} 
                />
            )}
            </div>
            <div id="post-quiz" className="flex flex-col place-items-center hidden">
            <h2 className="text-3xl mb-2">Quiz Complete</h2>
            <h2 className="mb-4">Your score is {score} / {testQuestions.questions.length}</h2>
            <button onClick={() => resetQuiz()} className="w-full rounded border-solid border-2 border-black p-4 bg-black text-white">Take It Again</button>
            <button className="w-full rounded border-solid border-2 border-black p-4 mt-8 bg-black text-white">Home</button>
            </div>
        </div>
        </div>
    </main>
    );
}
