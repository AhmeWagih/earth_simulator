'use client';
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = process.env.API_KEY;

const systemMessage = {
  "role": "system",
  "content": "You are a knowledgeable AI assistant. Please answer questions clearly and concisely."
};

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages
      ]
    };

    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
      try {
        console.log("Sending request to OpenAI API..."); // Log request
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        });

        console.log(`Received response with status: ${response.status}`); // Log response status

        if (!response.ok) {
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After");
            const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, retryCount) * 1000;
            console.log(`Rate limit exceeded. Retrying after ${delay} ms...`);
            await sleep(delay);
            retryCount++;
            continue;
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        }

        const data = await response.json();
        console.log("Received data:", data); // Log the response data
        setMessages([...chatMessages, {
          direction: 'incoming',
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
        break;
      } catch (error) {
        console.error("Error during API call:", error); // Log any errors
        setIsTyping(false); // Ensure typing indicator is cleared on error
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center relative z-30">
      <div className="h-[80%] w-[90%] max-w-4xl backdrop-blur-sm rounded-2xl overflow-hidden">
        <MainContainer className="h-full">
          <ChatContainer className="h-full">
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}
              className="p-4"
            >
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    message: message.message,
                    direction: message.sender === 'user' ? 'outgoing' : 'incoming',
                  }}
                />
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type your message here..."
              onSend={handleSend}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
