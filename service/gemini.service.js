
const axios = require('axios');

const getConveration = async () => {
  let contents = [
    {
      "parts": [
        {
          "text": "I am creating a one-on-one Tanglish chat between a boss and an employee. The AI should act as one of the participants, asking only one question at a time based on the user's input. The response should feel natural and conversational, in fluent Tanglish, without including direct Tamil script or multiple unrelated questions. The AI should not make up an entire conversation; it must only ask one question or respond based on the most recent input from the user to create a real-time back-and-forth chat experience."
        }
      ]

    }
  ];
  // contents[0].parts.push(data);
  const [converstionErr, converstionData] = await to(axios.post(apiUrl, { contents },
    {
      headers: { 'Content-Type': 'application/json' },
      params: { key: apiKey }
    }));
  if (converstionErr) {
    console.log(converstionErr);
    return converstionErr;
  }
  return converstionData;

}



const conversationWithGemini = async (req, res) => {
  const [err, data] = await to(getConveration());
  if (err) {
    return TE(err.message);
  }
  if (data) {
    return (data.data);
  }
}

module.exports.conversationWithGemini = conversationWithGemini;