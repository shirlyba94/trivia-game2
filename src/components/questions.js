import React, {useState, useEffect } from 'react';
import axios from "axios";
import Answer from './answer';
import Results from './results';
import './questions.css';

function shuffleArray(array) {
  let temptArray = array;
  for (let i = temptArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = temptArray[i];
    temptArray[i] = temptArray[j];
    temptArray[j] = temp;
  }
  return temptArray;
}


const Questions = (props) => {
  console.log(props);
  const difficulty=props.difficulty;
  let url='https://opentdb.com/api.php?amount=10'
  url += difficulty && `&difficulty=${difficulty}`
  

  const [nextQuestion, setNextQuestion] = useState(0);
  const [clickResult, setClickResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState("");
  
  useEffect(() => {
    axios.get(url)
    .then((response) => {setQuestions(response.data.results)
        }) 
    }, [])


 const onNextQuestion = () => {
    if (nextQuestion < questions.length-1) {
        setNextQuestion(nextQuestion + 1);
    }
    if(questions.length-1 === nextQuestion)
    {
      setClickResult(true);
    }
  };

  const onClickResult = () => {
    console.log(props)
    setClickResult(true);
  };

  const setScoreF = (scoreBeck) => {
    setScore(scoreBeck)
  };

  return (
    <div className='questions'>
    {!clickResult && (questions.length>0) &&(
    <div className='questions'>
        <button type="button" onClick={onClickResult}>END GAME❓❗❓</button>
          <h1> Questions: {nextQuestion+1}  🚀   Player: {props.name} </h1>
          <h3> Category : {(questions[nextQuestion].category)}</h3>
          <h2> {(questions[nextQuestion].question)}</h2>
          <Answer answers={shuffleArray([questions[nextQuestion].correct_answer, ...questions[nextQuestion].incorrect_answers])} items={questions[nextQuestion]} length={questions.length } nextQuestion={nextQuestion} setScoreF={(scoreBeck) => {setScoreF(scoreBeck)}} onNextQuestion={() => {onNextQuestion()}}/>
        </div>)}
    {clickResult &&(
       <Results
          score={score}
          onCancel={props.onCancel}/>)}
      {(questions.length<=0)&&(
          <h2> LOADING... </h2>
          )
      }
    </div>
  );
};



export default Questions;
