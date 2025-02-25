// const OpenAI = require('openai');
// const openai = new OpenAI({
//   apiKey: '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' // Replace with your actual API key
// });
// const fs = require('fs');
// const axios = require('axios');
// const getConveration = async () => {

//   const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "developer", content: "You are a helpful assistant." },
//       {
//         role: "user",
//         content: "I am creating a one-on-one Tanglish chat between a boss and an employee. The AI should act as one of the participants, asking only one question at a time based on the user's input. The response should feel natural and conversational, in fluent Tanglish, without including direct Tamil script or multiple unrelated questions. The AI should not make up an entire conversation; it must only ask one question or respond based on the most recent input from the user to create a real-time back-and-forth chat experience.",
//       },
//     ],
//   });

//   console.log(completion.choices[0].message);

// }



// const conversationWithGpt = async (req, res) => {
//   // const [err,data] = await to(getConveration());
//   const apiKey = '';
//   const url = 'https://api.openai.com/v1/audio/speech';

//   // Request payload
//   const requestBody = {
//     model: 'tts-1',
//     voice: 'alloy',
//     input: 'Hello world! This is a streaming test.',
//   };
//   const response = await axios.post(url, requestBody, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${apiKey}`,
//     },
//     responseType: 'stream',
//   });
//   const writer = fs.createWriteStream('output.mp3');
//   console.log("response", response);

//   response.data.pipe(writer);

//   writer.on('finish', () => {
//     console.log('Audio file saved as output.mp3');
//   });

//   writer.on('error', (err) => {
//     console.error('Error writing the file:', err);
//   });
// }
// // if(err){
// //    return TE(err.message);
// // }
// // if(data){
// //    return (data.data);
// // }


// module.exports.conversationWithGpt = conversationWithGpt;


// // import OpenAI from "openai";

// const openDeepSeek = new OpenAI({
//   baseURL: 'https://api.deepseek.com',
//   apiKey: 'sk-91329c706444454599896262c363ad71'
// });




// const converstionWithDeepSeek = async function () {
//   const completion = await openDeepSeek.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);

// }

// module.exports.converstionWithDeepSeek = converstionWithDeepSeek;