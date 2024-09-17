import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Quiz from "./quiz";
import HomeScreen from "./Homescreen";
import { questions } from "./questions";
import Chatbot from "./chat";

function App() {
  const [start, setStart] = useState(false);

  const startQuiz = () => {
    setStart(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {start ? (
            <Route path="/" element={<Quiz questions={questions} />} />
          ) : (
            <Route path="/" element={<HomeScreen startQuiz={startQuiz} />} />
          )}
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;