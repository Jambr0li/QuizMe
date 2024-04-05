import { useRouter } from "next/navigation";
import { useState } from "react";
import InteractiveQuiz from "./InteractiveQuiz";

export default function PromptForm({onSubmit}) {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [haveData, setHaveData] = useState(false);
    const [dataString, setDataString] = useState("");
    const [interactiveQuizActive, setInteractiveQuizActive] = useState(false)

    let data = ""

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt === "") return;

        try {
            setLoading(true);                
            // Perform the API call to fetch response
            const response = await fetch("/api/chat-gpt", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  prompt,
                }),
            });
            data = await response.json();
            console.log("Here is the raw data object = ")
            console.log(data)
            console.log(data.choices[0].message.content)
            data = JSON.parse(data.choices[0].message.content)
            console.log("data = " + data);
            console.log(data);
            console.log("typeof data is " + typeof data)
            setDataString(data)
            setHaveData(true);
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            setLoading(false);
        }

        // router.push(`/access-quiz?prompt=${encodeURIComponent(prompt)}`) //& userId=...
    };

    const handleInteractiveQuiz= () => {
        setInteractiveQuizActive(true)
    }

    if (loading) return (
        <p>Loading...</p>
    );
    else if (interactiveQuizActive) return ( 
        <>
            <InteractiveQuiz testQuestions={dataString}/>
        </>
    )
    else if (!haveData) return ( 
        <>
            <p className="text-3xl mb-8">What is your exam about?</p>
            <form className="flex flex-col w-full items-center justify-center h-full" onSubmit={handleSubmit} >
                <input  
                    className="mb-8 w-2/3 px-3 py-2 border border-black bg-white rounded focus:outline-none focus:border-blue-500"
                    type="text"
                    id="myInput"
                    placeholder="Hadoop, MapReduce, Javascript..."
                    value={prompt} 
                    onChange={e => {setPrompt(e.target.value)}}
                />
                <input
                    type="submit"
                    className="transition-all duration-300 font-bold text-xl px-4 py-2 bg-primary-btn border border-black rounded-md shadow-solid hover:shadow-solid-hover focus:outline-none focus:border-blue-500"
                    value="Generate Exam!"
                />
            </form>
        </>
    ); 
    else if (haveData) return ( 
    <>
        <button onClick={handleInteractiveQuiz} className="bg-black rounded text-white p-2 mb-2">Take Interactive Quiz</button>
        <button className="bg-black rounded text-white p-2">Generate PDFs</button>
        <p className="text-black">Here is the data:</p>
    </>
    );
}