import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PromptForm({onSubmit}) {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

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
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            setLoading(false);
        }

        router.push(`/access-quiz?prompt=${encodeURIComponent(prompt)}`) //& userId=...
    };

    if (loading) return (
        <p>Loading...</p>
    );
    else return (
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
    )
}