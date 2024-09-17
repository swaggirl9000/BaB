import { useState } from "react";
import Quiz from "./quiz";
import HomeScreen from "./Homescreen";
import { questions } from "./questions"; 

function App() {
  const [start, setStart] = useState(false);

  const startQuiz = () => {
    setStart(true);
  };


  return (<div className="app-container">
    {start ? (
      <Quiz questions={questions} />
    ) : (
      <HomeScreen startQuiz={startQuiz} />
    )}
    </div>
  );
}

export default App;
