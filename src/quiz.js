import { useState } from "react";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionIndex, setOptionIndex] = useState(null);
    const { question, options} = questions[currentQuestion];
    // save answers for moodel
    const [userAnswers, setUserAnswers] = useState([]);
    // when quiz is done
    const [quizOver, setQuizOver] = useState(false)
    const [chatbotResponse, setChatbotResponse] = useState(false)

    const onAnswerClick = (option, index) => {
        setOptionIndex(index);
    }

    const onClickNext = () => {
        setOptionIndex(null);

        // save answer to pass into model
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = {
            questionId: questions[currentQuestion].id,
            option: questions[currentQuestion].options[optionIndex],
        };
        setUserAnswers(updatedAnswers);
        console.log("Updated answers:", updatedAnswers);

        if(currentQuestion !== questions.length -1) {
            setCurrentQuestion(currentQuestion + 1);
        } else { //reset
            setCurrentQuestion(0);
            setQuizOver(true);
        }
    };

    return (
    <div className="quiz-container">
        {!quizOver ? ( <>
            <span className="current-question-no">{currentQuestion + 1}</span>
            <span className="total-questions">/{questions.length}</span>
            <h2>{question}</h2>
            <ul>
                {
                    options.map((option, index) => (
                    <li 
                        onClick={() => onAnswerClick(option, index)}
                        key={option}
                        className={optionIndex === index ? 'selected-answer' : null}
                        >
                            {option}
                    </li>      
                    ))        
                }
            </ul>
            <div className="footer">
                <button onClick= {onClickNext} disabled={optionIndex === null}>
                    {currentQuestion === questions.length - 1 ? "All done!": "Next..."}
                </button>
            </div>
        </>) : <div className="quiz-over">
            <h3>
                We're finding the perfect guy right now!
            </h3>
            </div>} 

    </div>);
};

//Line 60 is next stage
export default Quiz;