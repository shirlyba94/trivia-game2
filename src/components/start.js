import React, { useState } from 'react';
import Questions from './questions';
import './start.css';

const Start = () => {


  const [isStart, setIsStart] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const startGame = () => {
    if (!enteredName)
    {
      alert("enter name") ;
    }
    else
    {
      setIsStart(true);
    }
  };

  const stopGame = () => {
    setIsStart(false);
  };
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const onDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className='start'>
      {!isStart && (
        <main>
        <div className="big-logo">
          <h1>
            <span className="tilt-left">T</span>
            <span className="tilt-right">R</span>
            <span className="tilt-left">I</span>
            <span className="tilt-right">V</span>
            <span className="tilt-left">I</span>
            <span className="tilt-right">A</span>
          </h1>
          <h1>
            <span className="tilt-right">G</span>
            <span className="tilt-left">A</span>
            <span className="tilt-right">M</span>
            <span className="tilt-left">E</span>
          </h1>
        <p>Enter name player and difficulty then let's begin!</p>
        <div>
          <label> Name: </label>
          <input
            type="string"
            value={enteredName}
            onChange={nameChangeHandler}
          />
            <label> Difficulty: </label>
          <select className="select" value={difficulty} onChange={onDifficultyChange}>  
          <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            </select>
        </div>
        <button className="button" onClick={startGame}>START GAME!!</button>
        </div>
        </main>
      )}
      {isStart &&(
        <Questions
          onCancel={stopGame}
          question={0}
          difficulty={difficulty}
          name={enteredName}
        />
      )
    }
    </div>
  );
};

export default Start;