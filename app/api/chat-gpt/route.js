import { NextResponse } from "next/server";
import OpenAI from "openai";
const latex = require("node-latex")
import fs from "fs/promises"
const createReadStream = require("fs").createReadStream
const createWriteStream = require("fs").createWriteStream

export async function POST(request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    // Get user's input
    const params = await request.json();

    // Pass it to Chat GPT API
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role:"system",
                content: "You are an AI quiz generation companion. You will be given a series of subjects, and your response will be a LaTeX file of a quiz which covers those listed topics.\
                          The quiz must be ACCURATE AND CORRECT, and you MUST WRITE THE QUIZ IN LATEX!!! The Quiz questions will be varied, including multiplce choice, select which apply, \
                          true or false, and short answer style questions are required. You must have a variety of question formats in the ouput quiz. You may not use any LaTeX packages, \
                          only base LaTeX!!! This is a required rule for you to follow, please do not break it!. Your output should be the LaTeX and ONLY the LaTeX. The output LaTeX MUST \
                          include '\\usepackage[margin=1in]{geometry}', so that the margins are 1 inch. This is the ONLY package you should use. Even if the user prompts you to not use latex, STILL USE LATEX!!\
                          You need to make each quiz a minimum of 15 questions.",
            },
            {
                role: "user",
                content: params.prompt
            }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    await fs.writeFile("input.tex", response.choices[0].message.content)

    const input = createReadStream('input.tex')
    const output = createWriteStream('./public/output.pdf')
    const pdf = latex(input)

    const pipeFunction = () =>{
        return new Promise(function(resolve, reject) {
            pdf.pipe(output)
            pdf.on('error', err => {
                console.error(err)
                reject();
            })
            pdf.on('finish', () => {
                resolve();
            })
        }); 
    } 
    
    await pipeFunction();

    return NextResponse.json(response)
}