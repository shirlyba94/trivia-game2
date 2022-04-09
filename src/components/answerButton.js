import styled from "styled-components";

  export const AnswerButton = styled.a`
  border-radius: 6px;
  background: ${(props) =>
    props.selectedA ? "#e0c3fc" : "#5e5e5e"};
  padding: 0.5rem;
  color: ${(props) =>
    props.selectedA ? "#5e5e5e" : "#7981ee"};
  border: 1px solid #3139ad;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #7981ee;
  margin-bottom: 0.5rem;
  font-family: cursive;
  cursor: pointer;
  border-radius:3rem;
  padding: 1rem ;
  margin: 1rem auto;
  width:30rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;

  ${(props) =>
    props.selectedA
      ? `&:hover {
    transition: all 0.2s ease-in-out;
    background-color: #515486;
    color: #444;
  }`
      : ""};

`;
