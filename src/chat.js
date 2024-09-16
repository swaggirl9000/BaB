import { useEffect, useState } from "react";

const Chatbot = ({ chatbotData }) => {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        console.log("Data:", chatbotData);
    }, [chatbotData]);

    const handleUserMessage = (message) => {
        setChatHistory([...chatHistory, {user: true, text: message}]);

        fetch("/api/chatbot-respone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({message, personalityData: chatbotData}),
        })
        .then((respone) => respone.json())
        .then((botResponse) => {
            setChatHistory([...chatHistory, {user: true, text: message }, { user: false, text: botResponse.text}]);
        });
    };

    return (
        <div className="chatbot-page">
            <h1>Chat with .insert name.</h1>
            <div className="chat-window">
                {chatHistory.map((chat,index) => (
                    <div key={index} className={`chat-bubble ${chat.user ? "user" : "bot"}`}>
                        {chat.text}
                    </div>
                ))}
            </div>
                <ChatInput onSend={handleUserMessage}/>
        </div>
    );
};

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState("");
    const handleSendMessage = () => {
        if(message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="chat-input">
            <input 
                type = "text"
                value = {message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you waiting for? Let's Chat!"
            />
            <button onClick={handleSendMessage}Send></button>
        </div>
    );
};

export async function getServerSide(context) {
    const chatbotData = {} // user's preference
    return {
        props: {
            chatbotData,
        },
    };
}

export default Chatbot;