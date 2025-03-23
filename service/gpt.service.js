
const fs = require('fs');
require('../config');
const axios = require('axios');
const OpenAI = require('openai');
const client = new OpenAI({
  apiKey: CONFIG?.GPT_KEY
});

const getConveration = async (req) => {

  const question = req?.body?.question;
  let answer = "question asked :" + question + " answer :" + req?.body?.answer;
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a Tanglish chat expert. Correct Tanglish spelling and ask a fun follow-up question in Tanglish.
          
          1. **Correct the tanglish spelling only for answer not for questions asked. If there is no tanglish mistakes in the answer sentence no need to provide it.  Dont focus on english grammer or captilization.Return mistakes format: "incorrect -> correct".
          2. **Ask follow-up question:** Fun and context-aware.
          3. **Return strictly valid JSON with no markdown or backticks. Use this format:**
          {
            "correction": "<Corrected Tanglish sentence>",
            "mistake_explanation": "<Incorrect word> -> <Corrected word>",
            "next_question": "<Context-aware follow-up question>"
          }`
      },
      {
        role: "user",
        content: answer
      }
    ],
    "temperature": 0.3,
    "max_tokens": 120
  });




  // Extract and log response
  const responseText = completion.choices[0]?.message?.content || "No response received";
  console.log("Bot's Question:", JSON.stringify(responseText));
  let data = JSON.parse(responseText);


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