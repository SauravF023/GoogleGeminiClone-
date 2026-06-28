
// const apiKey = "CHOOSE_YOUR_OWN_API_KEY";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "CHOOSE_YOUR_OWN_API_KEY",
  dangerouslyAllowBrowser: true,
});

async function runChat(messages, image = null, onChunk = () => {}) {

  try {

    let finalMessages = [...messages];

    // Image upload case
    if (image) {

      const lastMessage = finalMessages[finalMessages.length - 1];

      finalMessages[finalMessages.length - 1] = {
        role: "user",
        content: [
          {
            type: "text",
            text: lastMessage.content,
          },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      };
    }

    console.log("MESSAGES SENT:", finalMessages);

    const stream = await openai.chat.completions.create({
      model: "openrouter/auto",
      messages: finalMessages,
      stream: true,
    });

     let fullResponse = "";
     for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content || "";
      fullResponse += text;
      onChunk(text);
    }
     return fullResponse;

  } catch (error) {

    console.log("FULL ERROR:", error);

    return "Error generating response";
  }
}

export default runChat;


