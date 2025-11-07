// import { useState } from "react";
// import { MessageSquare, X } from "lucide-react";

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all z-50"
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
//       </button>

//       {/* Chat Box */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
//           {/* Header */}
//           <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
//             <h3 className="font-semibold text-lg">Career Guide Bot</h3>
//             <button onClick={() => setIsOpen(false)}>
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Chat Content */}
//           <div className="p-4 flex-1 overflow-y-auto h-64">
//             <p className="text-gray-600 text-sm">
//               Hi! I am your Career Guide Bot. Ask me anything about career options after Class 10.
//             </p>
//           </div>

//           {/* Input Section */}
//           <div className="border-t border-gray-200 p-3 flex gap-2">
//             <input
//               type="text"
//               placeholder="Type your question..."
//               className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatBot;


import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import axios from "axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am your Career Guide Bot. Ask me anything about career options after Class 10." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/chatbot/chat", {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.reply || "Sorry, I couldn't process that.",
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Career Guide Bot</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 flex-1 overflow-y-auto max-h-64 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            {/* Invisible div to scroll into view */}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Section */}
          <div className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;

