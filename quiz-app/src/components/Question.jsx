import React from 'react';
import Option from './Option.jsx';
import QuizProgress from './QuizProgress.jsx';

export default function Question({ question, questionNumber, total, selectedAnswer, onSelect, onNext, isLast, showReview, onContinue }) {
  return (
    <section className="quiz-card">
      <QuizProgress current={questionNumber} total={total} />
      <div className="question-meta">
        <span className="category-pill">{question.category}</span>
        <span className="difficulty">{question.difficulty}</span>
      </div>
      <p className="question-count">QUESTION {String(questionNumber).padStart(2, '0')}</p>
      <h2 className="question-title">{question.question}</h2>
      <p className="choose-hint">Choose one answer from the options below.</p>
      <div className="options-list">
        {question.options.map((option, index) => (
          <Option
            key={`${question.id}-${index}`}
            option={option}
            index={index}
            selected={selectedAnswer === index}
            correct={question.answer === index}
            showReview={showReview}
            disabled={showReview}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      {showReview && <div className="explanation"><strong>Explanation:</strong> {question.explanation}</div>}
      <div className="quiz-footer">
        <span className="footer-note">{showReview ? 'Answer review' : 'Take your time — you’ve got this!'}</span>
        <button className="button button-primary next-button" type="button" onClick={showReview ? onContinue : onNext} disabled={!showReview && selectedAnswer === null}>
          {showReview ? (isLast ? 'See results' : 'Continue') : (isLast ? 'Finish quiz' : 'Next question')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
