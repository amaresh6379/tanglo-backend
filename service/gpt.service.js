
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
        1 **Correct the Tanglish spelling:   
         Dont care about the First letter starting or english grammer mistakes just focus on tanglish spelling, dont give any explanation just denote where is the mistake 
         Add up and appreciation
        2 **Ask a follow-up question to continue the chat the question need to be in tanglish**  
  
         **Always return the response in this exact JSON format:**  
        {
          "correction": "<Fixed Tanglish sentence>",
          "mistake_explanation": "<Word change> - <Tanglish la simple explanation>" ,
          "next_question": "<Casual follow-up question>"  
        }  
  
         Do not add extra text outside this JSON format.`
      },
      {
        role: "user",
        content: answer
      }
    ]
  });



  // Extract and log response
  const responseText = completion.choices[0]?.message?.content || "No response received";
  console.log("Bot's Question:", JSON.stringify(responseText));
  const data = JSON.parse(responseText);

  return {
    correctedAnswer: data?.correction.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    mistakes: data?.mistake_explanation,
    nextQuestion: data?.next_question,
  }


  console.log(completion.choices[0].message);

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