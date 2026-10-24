import { useState } from "react";
import questions from "./questions";

import Question from "./components/Question";
import QuizProgress from "./components/QuizProgress";
import Result from "./components/Result";

function App() {
  const [stage, setStage] = useState("home");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [answers, setAnswers] = useState([]);

  const [showAnswer, setShowAnswer] =
    useState(false);

  const question = questions[currentQuestion];

  // Count correct answers already stored
  const correctCount = answers.filter(
    (answer, index) =>
      answer === questions[index].answer
  ).length;

  const incorrectCount =
    answers.length - correctCount;

  // Start or reset the quiz
  function startQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowAnswer(false);
    setStage("quiz");
  }

  // Select an answer
  function selectAnswer(index) {
    if (showAnswer) return;

    setSelectedAnswer(index);
  }

  // Check the selected answer and move forward
  function handleNextClick() {
    if (selectedAnswer === null) return;

    // First click: show the correct answer
    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }

    // Save the selected answer
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] =
      selectedAnswer;

    setAnswers(updatedAnswers);

    // If this was the last question, show results
    if (currentQuestion === questions.length - 1) {
      setStage("result");
    } else {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  }

  // Restart the entire quiz
  function restartQuiz() {
    setStage("home");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowAnswer(false);
  }

  // Include the last answer when calculating final score
  const finalAnswers = [...answers];

  if (stage === "result" && selectedAnswer !== null) {
    finalAnswers[currentQuestion] = selectedAnswer;
  }

  const finalScore = finalAnswers.filter(
    (answer, index) =>
      answer === questions[index].answer
  ).length;

  return (
    <main className="app-shell">

      {/* Header */}
      <header className="site-header">
        <a
          className="brand"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            restartQuiz();
          }}
        >
          <span className="brand-icon">Q</span>
          <span>
            Quiz<span className="brand-accent">Spark</span>
          </span>
        </a>

        <span className="header-pill">
          <span className="status-dot"></span>
          QUICK KNOWLEDGE CHECK
        </span>
      </header>

      {/* Home Screen */}
      {stage === "home" && (
        <section className="home-screen">
          <div className="home-copy">
            <p className="eyebrow">
              <span className="eyebrow-line"></span>
              LEARN SOMETHING NEW
            </p>

            <h1>
              Small quiz.
              <br />
              <span>Big brain energy.</span>
            </h1>

            <p className="home-description">
              Test your web development basics with
              a quick set of questions. Choose your
              answers and see how well you do.
            </p>

            <div className="home-details">
              <div className="detail-item">
                <span className="detail-icon">☷</span>
                <span>
                  <strong>
                    {questions.length} Questions
                  </strong>
                  <small>Multiple choice</small>
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-icon">◷</span>
                <span>
                  <strong>5–10 Minutes</strong>
                  <small>At your own pace</small>
                </span>
              </div>
            </div>

            <button
              className="primary-button start-button"
              onClick={startQuiz}
            >
              Start Quiz →
            </button>

            <p className="small-note">
              No pressure. Just see what you know.
            </p>
          </div>

          {/* Decorative illustration */}
          <div className="home-art">
            <div className="art-glow"></div>

            <div className="quiz-illustration">
              <div className="illustration-top">
                <span className="mini-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>

                <span className="mini-label">
                  YOUR NEXT CHALLENGE
                </span>
              </div>

              <div className="illustration-title">
                Ready to test
                <br />
                your skills?
              </div>

              <div className="illustration-line">
                <span></span>
              </div>

              <div className="illustration-option active">
                <span>A</span>
                <b>HTML & CSS</b>
                <i>✓</i>
              </div>

              <div className="illustration-option">
                <span>B</span>
                <b>JavaScript</b>
              </div>

              <div className="illustration-option">
                <span>C</span>
                <b>React basics</b>
              </div>

              <div className="illustration-footer">
                <span>Keep going!</span>
                <span>01 / 10</span>
              </div>
            </div>

            <div className="floating-chip chip-top">
              {"< />"}
            </div>

            <div className="floating-chip chip-right">
              ✦
            </div>

            <div className="floating-badge">
              ✦ &nbsp; Let's do this!
            </div>
          </div>
        </section>
      )}

      {/* Quiz Screen */}
      {stage === "quiz" && (
        <section className="quiz-screen">
          <div className="quiz-heading">
            <p className="eyebrow">
              <span className="eyebrow-line"></span>
              WEB DEVELOPMENT
            </p>

            <h1>Let's test your knowledge.</h1>

            <p>
              Choose the best answer for each question.
            </p>
          </div>

          <QuizProgress
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
          />

          <Question
            question={question}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={selectAnswer}
            showAnswer={showAnswer}
          />

          <div className="quiz-actions">
            <span className="selection-hint">
              {selectedAnswer === null
                ? "Select an answer to continue"
                : showAnswer
                  ? selectedAnswer === question.answer
                    ? "Correct answer!"
                    : "Check the correct answer above."
                  : "Answer selected"}
            </span>

            <button
              className="primary-button next-button"
              onClick={handleNextClick}
              disabled={selectedAnswer === null}
            >
              {!showAnswer
                ? "Check Answer"
                : currentQuestion === questions.length - 1
                  ? "See Results"
                  : "Next Question"}

              <span className="button-arrow">→</span>
            </button>
          </div>
        </section>
      )}

      {/* Results Screen */}
      {stage === "result" && (
        <Result
          score={finalScore}
          totalQuestions={questions.length}
          correctCount={finalScore}
          incorrectCount={questions.length - finalScore}
          onRestart={restartQuiz}
        />
      )}

      {/* Footer */}
      <footer className="site-footer">
        <span>© 2026 QuizSpark</span>
        <span>
          Made for curious minds <span className="footer-heart">♥</span>
        </span>
      </footer>

    </main>
  );
}

export default App;