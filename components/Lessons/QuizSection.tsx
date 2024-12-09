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

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = (questionIndex: number) => {
    const userAnswer = selectedAnswers[questionIndex];
    const correctAnswer = quiz[questionIndex].answer;

    setFeedback((prev) => ({
      ...prev,
      [questionIndex]: userAnswer === correctAnswer ? 'correct' : 'incorrect',
    }));
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Quiz</h2>
      <div className="w-[140px] md:w-[180px] h-[4px] mb-4">
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
          <div key={index} className="p-4 border rounded-md shadow-sm bg-white">
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
                    onChange={() => handleOptionChange(index, option)}
                    className="form-radio text-purple-500 focus:ring-purple-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => handleSubmit(index)}
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Submit
            </button>
            {feedback[index] && (
              <div
                className={`mt-4 p-2 rounded ${
                  feedback[index] === 'correct'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {feedback[index] === 'correct' ? 'Correct!' : 'Try Again!'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSection;
