import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Quiz = ({ questions }) => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionIndex, setOptionIndex] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizOver, setQuizOver] = useState(false);
    const { question, options } = questions[currentQuestion];

    const onAnswerClick = (option, index) => {
        setOptionIndex(index);
    };

    const onClickNext = () => {
        setOptionIndex(null);
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = {
            questionId: questions[currentQuestion].id,
            category: questions[currentQuestion].category,
            option: questions[currentQuestion].options[optionIndex],
        };
        setUserAnswers(updatedAnswers);

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizOver(true);
            handleQuizCompletion(updatedAnswers);
        }
    };

    const handleQuizCompletion = (answers) => {
        const personality = answers.filter(answer => answer.category === "Personality Traits");
        sendToChatbotAPI(personality);
    };

    const sendToChatbotAPI = async (personalityData) => {
        try {
            const response = await fetch("/api/generate-chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ personalityData }),
            });
            const chatbot = await response.json();
            navigate("/chatbot", { state: { chatbotData: chatbot } });
        } catch (error) {
            console.error("Error generating chatbot:", error);
        }
    };

    return (
        <div className="quiz-container">
            {!quizOver ? (
                <>
                    <h2>{question}</h2>
                    <ul>
                        {options.map((option, index) => (
                            <li
                                onClick={() => onAnswerClick(option, index)}
                                key={option}
                                className={optionIndex === index ? 'selected-answer' : ''}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    <button onClick={onClickNext} disabled={optionIndex === null}>
                        {currentQuestion === questions.length - 1 ? "All done!" : "Next..."}
                    </button>
                </>
            ) : (
                <h3>We're finding the perfect guy right now!</h3>
            )}
        </div>
    );
};

export default Quiz;
