import { useState } from "react";

export default function PromptForm({onSubmit}) {
    
    const [prompt, setPrompt] = useState("");
    
    return (
        <form className="flex flex-col w-full items-center justify-center h-full"
            onSubmit={(e) => {
                e.preventDefault();
                // Fire callback
                if (prompt === ""){
                    return;
                }

                onSubmit(prompt);
                setPrompt("");
            }}
        >
            <input  
                className="mb-8 w-2/3 px-3 py-2 border border-black bg-white rounded focus:outline-none focus:border-blue-500"
                type="text"
                id="myInput"
                placeholder="Hadoop, MapReduce, Javascript..."
                value={prompt} 
                onChange={e => {
                    setPrompt(e.target.value)
                }}
            />
            <input
                type="submit"
                className="transition-all duration-300 font-bold text-xl px-4 py-2 bg-primary-btn border border-black rounded-md shadow-solid hover:shadow-solid-hover focus:outline-none focus:border-blue-500"
                value="Generate Exam!"
            />
        </form>
        
    );
}