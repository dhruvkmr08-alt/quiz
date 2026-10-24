function QuizProgress({ currentQuestion, totalQuestions }) {
  const progress =
    (currentQuestion / totalQuestions) * 100;

  return (
    <div className="progress-section">
      <div className="progress-labels">
        <span>Your progress</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default QuizProgress;