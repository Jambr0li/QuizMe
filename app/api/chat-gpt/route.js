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
    const num_questions = 8

    // Pass it to Chat GPT API
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role:"system",
                content: `You are an AI quiz generation companion. You will be given a series of subjects, and your response will be a JSON file of a ${num_questions}-question multiple choice quiz which covers the provided list of topics.\
                          The quiz must be ACCURATE AND CORRECT, and you MUST WRITE THE QUIZ IN THIS EXACT JSON FORMAT: 
                        {
                            questions: [
                                {
                                "question": "Question goes here",
                                "options": [
                                    "option 1",
                                    "option 2",
                                    "option 3",
                                    "option 4"
                                ],
                                "correct_answer": "option 2",
                                "explanation": "Explanation of the correct answer goes here"
                                }
                            ]
                        }

                        Follow the exact provided JSON format and make a quiz with ${num_questions} multiple choice questions. There should be ${num_questions} objects inside of the “questions” array that correspond to the ${num_questions} questions. 
                        Return ONLY THE JSON OBJECT and do not deviate.`,
            },
            {
                role: "user",
                content: params.prompt
            }
        ],
        temperature: 0,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    // await fs.writeFile("input.tex", response.choices[0].message.content)

    // const input = createReadStream('input.tex')
    // const output = createWriteStream('./public/output.pdf')
    // const pdf = latex(input)

    // const pipeFunction = () =>{
    //     return new Promise(function(resolve, reject) {
    //         pdf.pipe(output)
    //         pdf.on('error', err => {
    //             console.error(err)
    //             reject();
    //         })
    //         pdf.on('finish', () => {
    //             resolve();
    //         })
    //     }); 
    // } 
    
    // await pipeFunction();

    return NextResponse.json(response)
}