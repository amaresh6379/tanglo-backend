
const fs = require('fs');
require('../config');
const axios = require('axios');
const OpenAI = require('openai');
const client = new OpenAI({
  apiKey: CONFIG?.GPT_KEY
});

const getConveration = async (req) => {
  const answer = req?.body?.answer;
  const question = req?.body?.question;
  const completion = await client.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: `You are a Tanglish chat expert.
            When a user sends a message:
            1. **Correct the Tanglish spelling:**
              - Focus only on Tanglish spelling errors.
              - Ignore English grammar and capitalization.
              - Highlight and fix mistakes Dont need any correction notes For example just need this picha -> pidicha  dont add extra sentence.
              - Add an encouraging comment after correcting.
    
            2. **Ask a fun and joke, context-aware follow-up question in Tanglish (use chennai slang)**
              - Analyze both the **previous question and the user's response** to maintain context.
              - Ensure the follow-up question flows naturally based on the user's last response.
              - Avoid generic or irrelevant questions.
              - Add emojis to make it lively.
              - It should feel like friend typing an tanglish message.
    
            3. **Return the response strictly in this JSON format:**
            {
              "correction": "<Corrected Tanglish sentence>",
              "mistake_explanation": "<Incorrect word> -> <Corrected word> - <Tanglish la simple explanation>",
              "next_question": "<Context-aware follow-up question>"
            }`
      },
      {
        role: "user",
        content: answer,
        previousQuestion: question
      }
    ],
    "temperature": 0.4,
    "max_tokens": 200
  })


  // Extract and log response
  const responseText = completion.choices[0]?.message?.content || "No response received";
  console.log("Bot's Question:", JSON.stringify(responseText));
  const data = JSON.parse(responseText);

  return {
    correctedAnswer: data?.correction.split(" ").map((word, index) => {
      if (index == 0) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      else {
        return word
      }
    }).join(" "),
    mistakes: data?.mistake_explanation,
    nextQuestion: data?.next_question,
  }


}

module.exports.getConveration = getConveration;



const conversationWithGpt = async (req, res) => {
  // const [err,data] = await to(getConveration());
  const apiKey = '';
  const url = 'https://api.openai.com/v1/audio/speech';

  // Request payload
  const requestBody = {
    model: 'tts-1',
    voice: 'alloy',
    input: 'Hello world! This is a streaming test.',
  };
  const response = await axios.post(url, requestBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    responseType: 'stream',
  });
  const writer = fs.createWriteStream('output.mp3');
  console.log("response", response);

  response.data.pipe(writer);

  writer.on('finish', () => {
    console.log('Audio file saved as output.mp3');
  });

  writer.on('error', (err) => {
    console.error('Error writing the file:', err);
  });
}
// if(err){
//    return TE(err.message);
// }
// if(data){
//    return (data.data);
// }


module.exports.conversationWithGpt = conversationWithGpt;


// // import OpenAI from "openai";





// const converstionWithDeepSeek = async function () {
//   const completion = await openDeepSeek.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);

// }

// module.exports.converstionWithDeepSeek = converstionWithDeepSeek;