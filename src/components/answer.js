import React, { useState,useEffect,useRef } from 'react';
import './answer.css';
import {AnswerButton} from "./answerButton";

const Answer = (props) => {

    const [score, setScore] = useState(0);
    const [selectedAnswerIs, setSelectedAnswerIs] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [selectedAnswerOn, setSelectedAnswerOn] = useState(true);
    const [timer, setTimer] = useState('00:00:00');
    const answers=props.answers
    const Ref = useRef(null);
    //const shuffleArray = (answers) => answers.sort(() => 0.5 - Math.random());
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
        else{
            setSelectedAnswerIs(false);
            setTimeout(function () {
                if (props.length === props.nextQuestion) props.onNextQuestion()
              }, 2000);
        }
    }
    const clearTimer = (e) => {   
        setTimer('00:01:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    },[] );
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
    return (
        <div id="myButton">
            {answers.map((answer) => {
                return(
                <div key={answer.toString()}>
                    <AnswerButton 
                        selectedA={selectedAnswerIs}
                        isTrue={(answer === props.items.correct_answer)}
                        onClick={() => {
                        document.getElementById("myButton").className = 'answerClick';
                        if (selectedAnswerIs)
                        {
                            if (selectedAnswerIs) clearInterval(Ref.current)
                            setSelectedAnswerIs(false);
                            setSelectedAnswer("❌")
                            setSelectedAnswerOn(answer)
                            setTimeout(function () {
                                if (props.length-1 === props.nextQuestion) props.onNextQuestion()
                              }, 2000);
                            if (answer === props.items.correct_answer)
                            {
                                setSelectedAnswer("✅")
                                setScore(score+1)
                            }
                        }}}>{answer}{(answer === selectedAnswerOn)&&(selectedAnswer)}</AnswerButton>       
                </div>)})}
        <div className="buttonNext" >
            <h2>{timer}</h2>
            <h2 >Score: {score}</h2>
            {(props.length-1> props.nextQuestion) &&(<button type="button" onClick={() => 
                {props.onNextQuestion() 
                setSelectedAnswerIs(true) 
                props.setScoreF(score)
                onClickReset()
                document.getElementById("myButton").className = 'answer';
                setSelectedAnswer('')}}>
                {props.length-1 === props.nextQuestion ? 'END GAME':'NEXT'} 
            </button>)
           
        }
        </div>

    </div>
    );};

export default Answer;
