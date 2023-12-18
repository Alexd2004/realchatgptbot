import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Links for the open api key
});


import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Welcome to the chatbot program!'));
  console.log(colors.bold.green('You can start chatting with the bot, right down below.'));

  const chatHistory = []; // Will store the conversation of the history in a list

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      // Construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add latest user input
      messages.push({ role: 'user', content: userInput });

      // Call the API with user input & history
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });



      // Get completion text/content completion
      //const completionText = completion.data.choices[0].message.content;
      const completionText = completion.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.blue('Bot: ') + completionText);
        return;
      }

      console.log(colors.blue('Bot: ') + completionText);

      // Update history with user input and assistant response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();