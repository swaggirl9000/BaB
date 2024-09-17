import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

const Chatbot = () => {
    const location = useLocation();
    
    // Use useMemo to stabilize chatbotData
    const chatbotData = useMemo(() => location.state?.chatbotData || {}, [location.state?.chatbotData]);

    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        console.log("Chatbot data:", chatbotData);
    }, [chatbotData]);

    const handleUserMessage = (message) => {
        setChatHistory([...chatHistory, { user: true, text: message }]);

        fetch("/api/chatbot-response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, personalityData: chatbotData }),
        })
        .then((response) => response.json())
        .then((botResponse) => {
            setChatHistory([...chatHistory, { user: true, text: message }, { user: false, text: botResponse.text }]);
        });
    };

    return (
        <div className="chatbot-page">
            <h1>Chat with your AI boyfriend</h1>
            <div className="chat-window">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-bubble ${chat.user ? 'user' : 'bot'}`}>
                        {chat.text}
                    </div>
                ))}
            </div>
            <ChatInput onSend={handleUserMessage} />
        </div>
    );
};

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="chat-input">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you waiting for? Let's Chat!"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
