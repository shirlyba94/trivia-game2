import "./results.css";

const Results = (props) => {
  const score = props.score;
  return (
    <div className="results">
        <h1>
          You got 
        </h1>
        <h5>{score}</h5>
        <h3>points!</h3>
        <button type="button" onClick={props.onCancel}>Play Again!</button>
    </div>
  );
}

export default Results;





