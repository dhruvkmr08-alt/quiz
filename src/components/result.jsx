function Result({
  score,
  totalQuestions,
  correctCount,
  incorrectCount,
  onRestart
}) {
  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  let message = "Good effort! Keep practising.";
  let emoji = "💪";

  if (percentage >= 80) {
    message = "Amazing work! You know your stuff.";
    emoji = "🎉";
  } else if (percentage >= 50) {
    message = "Nice job! Keep learning and improving.";
    emoji = "👏";
  }

  return (
    <section className="result-card">
      <div className="result-emoji">{emoji}</div>

      <p className="eyebrow">QUIZ COMPLETED</p>

      <h2>Your Results</h2>

      <p className="result-message">{message}</p>

      <div className="score-circle">
        <span className="score-number">
          {score}/{totalQuestions}
        </span>

        <span className="score-caption">
          YOUR SCORE
        </span>
      </div>

      <div className="result-stats">
        <div className="stat-box">
          <span className="stat-number correct-text">
            {correctCount}
          </span>
          <span className="stat-label">Correct</span>
        </div>

        <div className="stat-box">
          <span className="stat-number incorrect-text">
            {incorrectCount}
          </span>
          <span className="stat-label">Incorrect</span>
        </div>

        <div className="stat-box">
          <span className="stat-number">
            {percentage}%
          </span>
          <span className="stat-label">Accuracy</span>
        </div>
      </div>

      <button
        className="primary-button restart-button"
        onClick={onRestart}
      >
        Try Again ↻
      </button>
    </section>
  );
}

export default Result;