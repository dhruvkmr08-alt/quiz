import Option from "./Option";

function Question({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showAnswer
}) {
  return (
    <section className="question-card">
      <div className="question-topline">
        <span className="question-tag">
          QUESTION {questionNumber}
        </span>

        <span className="question-count">
          {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h2 className="question-title">
        {question.question}
      </h2>

      <div className="options-list">
        {question.options.map((option, index) => (
          <Option
            key={index}
            text={option}
            index={index}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.answer}
            showAnswer={showAnswer}
            onSelect={onSelectAnswer}
          />
        ))}
      </div>
    </section>
  );
}

export default Question;