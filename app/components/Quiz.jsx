import React, { useState } from "react";

const Quiz = ({ question, onAnswer }) => {
  const [isCorrect, setIsCorrect] = useState(null);
  const correctIndex = question.options.indexOf(question.correct_answer);

  const handleSelect = (option, index) => {
    if (option === question.correct_answer) {
      setIsCorrect(true);
      document.getElementById("correct-message").classList.remove("hidden");
    } else {
      setIsCorrect(false);
      document.getElementById("incorrect-message").classList.remove("hidden");
      document
        .getElementById(`option_${index}`)
        .classList.remove("bg-slate-100");
      document.getElementById(`option_${index}`).classList.add("bg-red-100");
    }
    console.log("selected " + option);

    for (let i = 0; i < 4; i++) {
      document
        .getElementById(`option_${i}`)
        .classList.add("pointer-events-none");
    }

    document
      .getElementById(`option_${correctIndex}`)
      .classList.remove("bg-slate-100");
    document
      .getElementById(`option_${correctIndex}`)
      .classList.add("bg-green-300");
    document.getElementById("nextButton").classList.remove("hidden");
    document.getElementById("explanation").classList.remove("hidden");
  };

  const handleSubmit = () => {
    for (let i = 0; i < 4; i++) {
      document
        .getElementById(`option_${i}`)
        .classList.remove("pointer-events-none");
      document.getElementById(`option_${i}`).classList.remove("bg-red-100");
      document.getElementById(`option_${i}`).classList.add("bg-slate-100");
    }
    document.getElementById("correct-message").classList.add("hidden");
    document.getElementById("incorrect-message").classList.add("hidden");
    document
      .getElementById(`option_${correctIndex}`)
      .classList.remove("bg-green-300");
    document
      .getElementById(`option_${correctIndex}`)
      .classList.add("bg-slate-100");
    document.getElementById("nextButton").classList.add("hidden");
    document.getElementById("explanation").classList.add("hidden");
    onAnswer(isCorrect);
  };

  return (
    <div className="flex flex-col text-black">
      <h2 className="text-2xl mb-2">{question.question}</h2>
      {question.options.map((option, index) => (
        <button
          id={`option_${index}`}
          key={index}
          onClick={() => handleSelect(option, index)}
          className="text-left p-2 rounded bg-slate-100 mb-4 hover:bg-slate-300"
        >
          {option}
        </button>
      ))}
      <div id="explanation" className="hidden mb-4">
        <p id="correct-message" className="test-lg text-green-500 hidden">
          Correct!
        </p>
        <p id="incorrect-message" className="test-lg text-red-500 hidden">
          Incorrect!
        </p>
        <p>{question.explanation}</p>
      </div>
      <button
        id="nextButton"
        className="hidden rounded border-solid border-black border-2 p-4"
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
