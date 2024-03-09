export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <h1 className="text-6xl mb-16 mt-title">Quiz Me</h1>
      <div className="w-full flex flex-col items-center min-h-min">
        <p className="text-3xl mb-8">What is your exam about?</p>
        <input
          type="text"
          id="myInput"
          placeholder="Hadoop, MapReduce, Javascript..."
          className="mb-8 w-2/3 px-3 py-2 border border-black bg-white rounded focus:outline-none focus:border-blue-500"
        />
        <button className=" font-bold text-xl px-4 py-2 bg-primary-btn border border-black rounded-md shadow-solid hover:shadow-solid-hover focus:outline-none focus:border-blue-500">
            Generate Exam!
        </button>
      </div>
    </main>
  );
}