function Option({
  text,
  index,
  selectedAnswer,
  correctAnswer,
  showAnswer,
  onSelect
}) {
  let className = "option";

  if (selectedAnswer === index) {
    className += " selected";
  }

  if (showAnswer && index === correctAnswer) {
    className += " correct";
  } else if (
    showAnswer &&
    selectedAnswer === index &&
    selectedAnswer !== correctAnswer
  ) {
    className += " incorrect";
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(index)}
      disabled={showAnswer}
    >
      <span className="option-letter">
        {String.fromCharCode(65 + index)}
      </span>

      <span>{text}</span>

      {showAnswer && index === correctAnswer && (
        <span className="option-mark">✓</span>
      )}

      {showAnswer &&
        selectedAnswer === index &&
        selectedAnswer !== correctAnswer && (
          <span className="option-mark">×</span>
        )}
    </button>
  );
}

export default Option;