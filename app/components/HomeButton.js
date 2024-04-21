import { useRouter } from "next/navigation"

export default function HomeButton(){
    const router = useRouter()
   
    const handleHomeClick = () => {
        router.push('/')
    }

    return (
        <button onClick={handleHomeClick} className="w-full rounded border-solid border-2 border-black p-4 mt-8 bg-black text-white">Home</button>
    )

}