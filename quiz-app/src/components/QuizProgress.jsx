import React from 'react';

export default function QuizProgress({ current, total }) {
  const percentage = (current / total) * 100;
  return (
    <div className="progress-area">
      <div className="progress-labels">
        <span>YOUR PROGRESS</span>
        <strong>{current} of {total}</strong>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={current} aria-valuemin="0" aria-valuemax={total}>
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
