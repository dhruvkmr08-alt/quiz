import React, { useState } from 'react';
import questionsData from './questions.js';
import Question from './components/Question.jsx';
import Result from './components/Result.jsx';

function shuffleQuestions(list) {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [stage, setStage] = useState('home'); // home, quiz, results
  const [questions, setQuestions] = useState(questionsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex] ?? null;

  function startQuiz() {
    setQuestions(shuffleQuestions(questionsData));
    setCurrentIndex(0);
    setAnswers({});
    setShowReview(false);
    setStage('quiz');
  }

  function selectAnswer(optionIndex) {
    if (showReview) return;
    setAnswers(previous => ({ ...previous, [currentIndex]: optionIndex }));
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;
    // Show the correct answer and explanation before moving to the next question.
    setShowReview(true);
  }

  function continueQuiz() {
    if (currentIndex === questions.length - 1) {
      setStage('results');
      return;
    }
    setCurrentIndex(index => index + 1);
    setShowReview(false);
  }

  function goHome() {
    setStage('home');
    setCurrentIndex(0);
    setAnswers({});
    setShowReview(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={goHome} aria-label="Quiz home">
          <span className="brand-mark">Q</span><span>quiz<span className="brand-accent">spark</span></span>
        </button>
        <span className="topbar-label"><span className="live-dot" /> INTERACTIVE LEARNING</span>
      </header>

      {stage === 'home' && (
        <section className="home-layout">
          <div className="home-copy">
            <div className="welcome-pill"><span>✦</span> LEARN SOMETHING NEW</div>
            <h1>Small steps.<br /><span>Big brain</span> energy.</h1>
            <p className="home-description">Challenge yourself with a quick quiz on web development. Test what you know, discover what you don’t, and have a little fun along the way.</p>
            <div className="home-features">
              <div><span className="feature-icon purple">◷</span><span><strong>5–8 minutes</strong><small>Quick and focused</small></span></div>
              <div><span className="feature-icon yellow">✧</span><span><strong>{questionsData.length} questions</strong><small>HTML, CSS, JavaScript & React</small></span></div>
            </div>
            <button className="button button-primary start-button" type="button" onClick={startQuiz}>Start the quiz <span aria-hidden="true">→</span></button>
            <p className="no-pressure">No pressure. Just progress. </p>
          </div>
          <div className="home-art" aria-label="Quiz summary">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="floating-card floating-top"><span className="floating-icon">✦</span><span><strong>Curiosity mode</strong><small>ON, always</small></span></div>
            <div className="main-illustration"><div className="illustration-glow" /><div className="illustration-star star-one">✦</div><div className="illustration-star star-two">✧</div><div className="brain">🧠</div><div className="illustration-caption">YOUR NEXT BIG IDEA</div></div>
            <div className="floating-card floating-bottom"><span className="check-bubble">✓</span><span><strong>One question at a time</strong><small>You’ve got this!</small></span></div>
            <div className="decor-dot dot-one" /><div className="decor-dot dot-two" /><div className="decor-dot dot-three" />
          </div>
        </section>
      )}

      {stage === 'quiz' && currentQuestion && (
        <div className="quiz-layout">
          <div className="section-heading"><p className="eyebrow">YOUR LEARNING SESSION</p><h1>Let’s test your <span>knowledge.</span></h1><p>Trust your instincts. Every question is a chance to learn.</p></div>
          <Question
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            total={questions.length}
            selectedAnswer={selectedAnswer}
            onSelect={selectAnswer}
            onNext={nextQuestion}
            isLast={currentIndex === questions.length - 1}
            showReview={showReview}
            onContinue={continueQuiz}
          />
          <p className="quiz-tip">✦ &nbsp; Tip: Read every option before you make your choice.</p>
        </div>
      )}

      {stage === 'results' && <div className="results-layout"><Result questions={questions} answers={answers} onRestart={startQuiz} onHome={goHome} /></div>}

      <footer className="site-footer"><span>© 2026 Quiz</span><span>Made for curious minds <span className="footer-heart">♥</span></span></footer>
    </main>
  );
}
