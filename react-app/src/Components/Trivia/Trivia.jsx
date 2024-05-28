
import React, { useState } from 'react';
import './Trivia.css';
import { data } from '../../assets/data';
import Header from '../Header/header';

// Defining the Trivia component as a functional component
const Trivia = () => {
  // State variables
  const [index, setIndex] = useState(0); // Tracks the current question index
  const [question, setQuestion] = useState(data[0]); // Holds the current question object
  const [lock, setLock] = useState(false); // Boolean flag to prevent multiple selections
  const [score, setScore] = useState(0); // Tracks the user's score
  const [result, setResult] = useState(false); // Boolean flag to indicate the quiz result
  const [selectedOption, setSelectedOption] = useState(null); // Tracks the selected option

  // checkAns function checks if the selected option is correct
  const checkAns = (ans) => {
    if (!lock) {
      setSelectedOption(ans);
      setLock(true);
      if (question.ans === ans) {
        setScore(prev => prev + 1);
      }
    }
  };

  // next function moves to the next question
  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        setQuestion(data[nextIndex]);
        setLock(false);
        setSelectedOption(null);
      }
    }
  };

  // previous function moves to the previous question
  const previous = () => {
    if (lock && index > 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setQuestion(data[prevIndex]);
      setLock(false);
      setSelectedOption(null);
    }
  };

  // reset function resets the quiz
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setSelectedOption(null);
  };

  // Conditionally rendering the Trivia component
  return (
    <div className='container'>
      <Header />
      {result ? (
        <div>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </div>
      ) : (
        <div>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            {[question.option1, question.option2, question.option3, question.option4].map((option, i) => {
              const optionNumber = i + 1;
              let className = '';
              if (selectedOption !== null) {
                if (optionNumber === selectedOption) {
                  className = optionNumber === question.ans ? 'correct' : 'wrong';
                } else if (optionNumber === question.ans) {
                  className = 'correct';
                }
              }
              return (
                <li
                  key={i}
                  className={className}
                  onClick={() => checkAns(optionNumber)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
          <div className='button-section'>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
          </div>
          <div className='index'>{index + 1} of {data.length} questions</div>
        </div>
      )}
    </div>
  );
};

export default Trivia;
