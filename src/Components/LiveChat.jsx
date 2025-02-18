import { useState, useEffect, useContext } from "react";
import { MessageSquare } from "lucide-react";
import { ThemeContext } from "../providers/ThemeProvider";


const LiveChat = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hello! How can I assist you today?", timestamp: new Date(), options: [] },
  ]);
  const [input, setInput] = useState("");
  const [isAgentOnline, setIsAgentOnline] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAgentOnline((prev) => !prev);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMessageSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "User", text: input, timestamp: new Date(), options: [] };
    setMessages((prev) => [...prev, newMessage]);

    const aiResponse = getAIResponse(input.toLowerCase());
    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput("");
    setSelectedOption(null);
  };

  const getAIResponse = (userInput) => {
    if (userInput.includes("course")) {
      return {
        sender: "AI",
        text: "I can help you with our courses. What would you like to know?",
        options: [
          "View available courses",
          "Check course details",
          "Enroll in a course"
        ],
        timestamp: new Date()
      };
    } else {
      return {
        sender: "AI",
        text: "I'm here to assist you. What would you like to ask?",
        options: [
          "Ask about courses",
          "Discuss pricing",
          "Contact support"
        ],
        timestamp: new Date()
      };
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newMessage = { sender: "User", text: option, timestamp: new Date(), options: [] };
    setMessages((prev) => [...prev, newMessage]);
    const aiResponse = getAIResponse(option.toLowerCase());
    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div  className={`w-full  mx-auto py-12 px-8 ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
    <div className={`w-full max-w-lg mx-auto m-10 p-4 sm:p-6 rounded-lg border relative transition-all duration-300 ${isDarkMode ? "bg-black text-white border-gray-700" : "bg-gray-200 text-black border-gray-300"}`}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold">Live Chat</h2>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isAgentOnline ? "Chatting with an agent" : "AI Assistant is available"}
          </div>
        </div>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
      </div>

      <div className="space-y-4 h-72 sm:h-96 overflow-y-auto mb-4 p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"} items-end gap-2`}>
            <div className={`p-3 rounded-lg max-w-xs sm:max-w-sm ${msg.sender === "User" ? "bg-blue-500 text-white" : isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
              <p>{msg.text}</p>
              {msg.options && msg.options.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`block w-full text-left p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-2 border-t border-gray-300 dark:border-gray-700">
        <input
          type="text"
          className={`w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleMessageSend}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

export default LiveChat;
