'use client';

import React, { useState } from 'react';

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type QuizSectionProps = {
  quiz: QuizQuestion[];
};

const QuizSection: React.FC<QuizSectionProps> = ({ quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: 'correct' | 'incorrect' }>({});
  const [submitted, setSubmitted] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false); // Track if all answers are correct

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));

    // Reset feedback for the current question if they change their answer
    setFeedback((prev) => {
      const newFeedback = { ...prev };
      delete newFeedback[questionIndex];
      return newFeedback;
    });
  };

  const handleSubmit = () => {
    const newFeedback: { [key: number]: 'correct' | 'incorrect' } = {};

    quiz.forEach((q, index) => {
      const userAnswer = selectedAnswers[index];
      newFeedback[index] = userAnswer === q.answer ? 'correct' : 'incorrect';
    });

    setFeedback(newFeedback);
    setSubmitted(true);

    // Check if all answers are correct
    setAllCorrect(Object.values(newFeedback).every((val) => val === 'correct'));
  };

  const handleRetry = () => {
    setSubmitted(false); // Only reset the submitted state
    setAllCorrect(false); // Reset all-correct flag
  };

  return (
    <div className="mb-8 px-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Quiz</h2>
      <div className="w-[60px] md:w-[80px] h-[4px] mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="4"
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
          fill="none"
        >
          <rect x="0" width="33.3333" height="4" fill="#FE3302" />
          <rect x="33.3333" width="33.3333" height="4" fill="#FEC001" />
          <rect x="66.6666" width="33.3334" height="4" fill="#0255EE" />
        </svg>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {quiz.map((q, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md bg-white">
            <p className="font-medium mb-4">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center cursor-pointer space-x-2"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="form-radio text-purple-500 focus:ring-purple-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {feedback[index] && (
              <div
                className={`mt-4 px-4 py-1 rounded-full inline-block ${
                  feedback[index] === 'correct'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {feedback[index] === 'correct' ? 'Correct!' : 'Try again!'}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-brightRed text-white py-2 px-6 rounded hover:brightness-110"
        >
          Submit
        </button>
        {submitted && (
          <button
            onClick={handleRetry}
            className="text-yellow-950 bg-yellow-400 bg-opacity-30 py-2 px-6 rounded hover:bg-opacity-40"
          >
            Retry
          </button>
        )}
      </div>
      {submitted && allCorrect && (
        <div
          className={`mt-4 py-4 rounded text-green-700`}
        >
          <h3 className="text-lg font-bold">
            Well done! You got all the answers correct!
          </h3>
        </div>
      )}
      {submitted && !allCorrect && (
        <div
          className={`mt-4 py-4 rounded text-yellow-700`}
        >
          <h3 className="text-lg font-bold">
            Good effort! Review the incorrect answers and try again.
          </h3>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
