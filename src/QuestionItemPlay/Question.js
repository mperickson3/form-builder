import "./Question.css";
import Card from "../UI/Card.js";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../store";
import AnswerList from "./AnswerList";
import { useState, useEffect } from "react";

const Question = (props) => {
  const [style2, setStyle2] = useState({});
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const activeQuestion = useSelector((state) => state[currentQuestion]);

  const submitHandler = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setCurrentQuestion((prevState) => {
        if (prevState < props.quizLength - 1) {
          return prevState + 1;
        } else {
          return prevState;
        }
      });
    }, 250);
  };

  const backButton = () => {
    if (currentQuestion > 0) {
      setStyle2({
        transform: "translateX(100%)",
        transition: "transform 0.5s ease-in-out",
      });
      setTimeout(() => {
        setCurrentQuestion((prevState) => {
          return prevState - 1;
        });
      }, 250);
      setTimeout(() => {
        setStyle2({ transform: "translateX(-100%)", transition: "0s" });
      }, 500);
    } else {
      setStyle2({
        transform: "translateX(-95%)",
        transition: "0.1s ease-in-out",
      });
      setTimeout(() => {
        setStyle2({
          transform: "translateX(-100%)",
          transition: "0.1s ease-in-out",
        });
      }, 100);
    }
  };

  return (
    <Card key="Question">
      <form onSubmit={submitHandler}>
        <div className="qTitle" key={"Question Title "}>
          {activeQuestion.title}
        </div>
        <AnswerList
          questionID={currentQuestion}
          activeQuestionAnswers={activeQuestion.answers}
          style2={style2}
        ></AnswerList>
      </form>
      <button
        key={"button" + currentQuestion}
        className="Back"
        onClick={backButton}
      >
        BACK
      </button>
    </Card>
  );
};

export default Question;
