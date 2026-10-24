import React from 'react';

export default function Option({ option, index, selected, correct, showReview, disabled, onClick }) {
  const letter = String.fromCharCode(65 + index);
  let className = 'option';
  if (selected) className += ' selected';
  if (showReview && correct) className += ' correct';
  if (showReview && selected && !correct) className += ' incorrect';

  return (
    <button className={className} type="button" onClick={onClick} disabled={disabled}>
      <span className="option-letter">{letter}</span>
      <span className="option-text">{option}</span>
      {showReview && correct && <span className="option-mark" aria-label="Correct answer">✓</span>}
      {showReview && selected && !correct && <span className="option-mark" aria-label="Your answer">×</span>}
    </button>
  );
}
