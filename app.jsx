import React, { useState } from "react";
import "./App.css";
const questions = [
  {
    question: "Which language is used to style a webpage?",
    options: ["HTML", "CSS", "Java", "Python"],
    answer: 1
  },
  {
    question: "Which language is used to make webpages interactive?",
    options: ["CSS", "HTML", "JavaScript", "SQL"],
    answer: 2
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useData", "useStyle"],
    answer: 1
  },
  {
    question: "Which symbol is used for comments in CSS?",
    options: ["//", "<!-- -->", "/* */", "##"],
    answer: 2
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    options: ["<h6>", "<head>", "<h1>", "<p>"],
    answer: 2
  },
  {
    question: "Which method is used to display array items in React?",
    options: [".map()", ".push()", ".pop()", ".join()"],
    answer: 0
  },
  {
    question: "Which company created React?",
    options: ["Google", "Microsoft", "Meta", "Amazon"],
    answer: 2
  },
  {
    question: "Which HTML tag creates a link?",
    options: ["<p>", "<a>", "<img>", "<div>"],
    answer: 1
  },
  {
    question: "Which property changes text colour in CSS?",
    options: ["font-size", "background", "color", "margin"],
    answer: 2
  }
];

function Option(props) {
  return (
    <button
      className={props.selected ? "option selected" : "option"}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

function Question(props) {
  return (
    <div>
      <h3>{props.question}</h3>

      {props.options.map((option, index) => (
        <Option
          key={index}
          text={option}
          selected={props.selected === index}
          onClick={() => props.onSelect(index)}
        />
      ))}
    </div>
  );
}

function QuizProgress(props) {
  return (
    <div>
      <p>Question {props.current + 1} / {props.total}</p>

      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: ((props.current + 1) / props.total) * 100 + "%"
          }}
        ></div>
      </div>
    </div>
  );
}

function Result(props) {
  return (
    <div className="card">
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {props.score} / {props.total}</h2>
      <p>Correct Answers: {props.score}</p>
      <p>Incorrect Answers: {props.total - props.score}</p>

      <h3>
        {props.score >= 7
          ? "Excellent work!"
          : props.score >= 5
          ? "Good job! Keep practising."
          : "Keep learning and try again!"}
      </h3>

      <button onClick={props.restart}>Restart Quiz</button>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  function nextQuestion() {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    if (current === questions.length - 1) {
      setStage("result");
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function restartQuiz() {
    setStage("start");
    setCurrent(0);
    setSelected(null);
    setScore(0);
  }

  return (
    <div className="app">
      {stage === "start" && (
        <div className="card">
          <h1>Quick Quiz</h1>
          <p>Test your knowledge of web development!</p>
          <p>Total Questions: {questions.length}</p>
          <button onClick={() => setStage("quiz")}>
            Start Quiz
          </button>
        </div>
      )}

      {stage === "quiz" && (
        <div className="card">
          <QuizProgress
            current={current}
            total={questions.length}
          />

          <Question
            question={questions[current].question}
            options={questions[current].options}
            selected={selected}
            onSelect={setSelected}
          />

          <button
            onClick={nextQuestion}
            disabled={selected === null}
          >
            {current === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      )}

      {stage === "result" && (
        <Result
          score={score}
          total={questions.length}
          restart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
