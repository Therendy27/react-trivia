// Importing necessary dependencies. 
import React, { useState } from 'react'
// the CSS file for styling
import './Trivia.css'
// data which contains the trivia questions.
import { data } from '../../assets/data';
import { useRef } from 'react';
import Header from '../Header/header';




// Defining the Trivia component as a functional component.
const Trivia = () => {
 // Declaring state variables using the useState hook
//    index: Tracks the current question index.
    let [index,setIndex] = useState(0);
    // question: Holds the current question object from the data array.
    let [question,setQuestion] = useState(data[index]);
    // lock: Boolean flag to prevent multiple selections for a single question.
    let[lock,setLock] = useState(false);
    // score: Tracks the user's score.
    let[score,setScore] = useState(0);
    // result: Boolean flag to indicate the quiz result.
    let [result,setResult] = useState(false);

    // Creating references for each option
    // useRef is used to create references for each option (Option1, Option2, Option3, Option4).
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    
    // Storing the option references in an array for easier access
    let option_array = [Option1,Option2,Option3,Option4];


    // checkAns function checks if the selected option is correct.
    const checkAns = (e,ans) =>{
        // if the chosen option equals the correct answer from the data.js 
        // If the quiz is not locked (lock is false), it compares the selected
        //  option (ans) with the correct answer (question.ans).
        if(lock === false){
            // if the chosen option = the ans from the data.js 
            if(question.ans===ans){
                e.target.classList.add("correct")
                // after one click you cant click another option 
                // Adds the "correct" class to the correct option and 
                // increments the score if the answer is correct.
                setLock(true)
                setScore(prev=>prev+1)
             }else{
                // Adds the "wrong" class to the selected option if
                //  the answer is incorrect and highlights the correct option.
                e.target.classList.add("wrong")
                // after one click you cant click another option 
                // Sets lock to true to prevent further selections
                //  for the current question.
                setLock(true)
                option_array[question.ans - 1].current.classList.add("correct");
             }
        }
        
    }
    // next function moves to the next question.
     const next = () => {
        if (lock === true){
            // If the current question is the last one, 
            // it sets result to true to show the result and returns.
            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            // Otherwise, increments the index, updates the question,
            //  and resets lock to false.
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false)
            // Clears the "wrong" and "correct" classes from all options.
            option_array.map((option) =>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null;
            })
        }
     }
    //  previous function moves to the previous question.
     const previous = () => {
    // Checks if the quiz is locked (lock is true).
        if (lock === true){
    // If the current question is the first one (index is 0),
    //  it returns without making changes.
            if (index === 0){
                return 0 ;
            }
            // Otherwise, decrements the index,
            //  updates the question, and resets lock to false.
            setIndex(--index);
            setQuestion(data[index]);
            setLock(false)
            // Clears the "wrong" and "correct" classes from all options.
            option_array.map((option) =>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null;
            })
        }

     }
    //  reset function resets the quiz.
     const reset = () => {
        // Sets index to 0, updates the question to the first question, 
        // and resets score, lock, and result.
        setIndex(0);
        setQuestion(data[0]);
        setScore(0)
        setLock(false);
        setResult(false);
     }
    //  Renders the Trivia component.
  return (
    <div className='container'>
       <Header/>
       {/* Conditionally renders the quiz or the result 
       based on the result state. */}
       {/* If the quiz is ongoing (result is false) */}
       {result?<></>:<>
       <h2>{index+1}. {question.question}</h2>
       <ul>
        {/* Displays the current question and its options. */}
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
       </ul>
       {/* Provides "Previous" and "Next" buttons to navigate between questions. */}
       <div className='button-section'>
       <button onClick={previous}>Previous</button>
       <button onClick={next}>Next</button>
       </div>
        
       <div className="index">{index+1} of {data.length} questions</div>
       </>}
       {/* If the quiz is over (result is true): */}
       {result?<>
       {/* Displays the user's score and a "Reset" button to restart the quiz. */}
       <h2>You Scored {score} out of {data.length}</h2>
       <button onClick={reset}>Reset</button>
       </>:<></>}
    </div>
  )
}

export default Trivia