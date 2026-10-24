import React from 'react';

export default function Result({ questions, answers, onRestart, onHome }) {
  const correctCount = questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const incorrectCount = questions.length - correctCount;
  const percentage = Math.round((correctCount / questions.length) * 100);
  let message = 'Good effort! Keep practising and you will improve.';
  let emoji = '💪';
  if (percentage >= 80) { message = 'Excellent work! You really know your stuff.'; emoji = '🏆'; }
  else if (percentage >= 50) { message = 'Nice work! You are making good progress.'; emoji = '✨'; }

  return (
    <section className="result-card">
      <div className="result-emoji" aria-hidden="true">{emoji}</div>
      <p className="eyebrow">QUIZ COMPLETED</p>
      <h2 className="result-title">You did it!</h2>
      <p className="result-message">{message}</p>
      <div className="score-circle" style={{ '--score': `${percentage}%` }}>
        <div className="score-inner"><strong>{percentage}%</strong><span>YOUR SCORE</span></div>
      </div>
      <div className="score-stats">
        <div className="stat stat-correct"><span className="stat-icon">✓</span><strong>{correctCount}</strong><span>Correct</span></div>
        <div className="stat stat-incorrect"><span className="stat-icon">×</span><strong>{incorrectCount}</strong><span>Incorrect</span></div>
        <div className="stat"><span className="stat-icon">◎</span><strong>{questions.length}</strong><span>Total</span></div>
      </div>
      <div className="review-section">
        <h3>Answer review</h3>
        {questions.map((question, index) => {
          const isCorrect = answers[index] === question.answer;
          return (
            <div className="review-item" key={question.id}>
              <div className={`review-status ${isCorrect ? 'review-good' : 'review-bad'}`}>{isCorrect ? '✓' : '×'}</div>
              <div className="review-copy">
                <strong>{index + 1}. {question.question}</strong>
                <span>Your answer: {answers[index] === undefined ? 'Not answered' : question.options[answers[index]]}</span>
                {!isCorrect && <span className="correct-answer">Correct answer: {question.options[question.answer]}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="result-actions">
        <button className="button button-primary" type="button" onClick={onRestart}>↻ Try again</button>
        <button className="button button-secondary" type="button" onClick={onHome}>Back to home</button>
      </div>
    </section>
  );
}
