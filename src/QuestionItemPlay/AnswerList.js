import Card from "../UI/Card";
import "./Question.css";
import Answer from "./Answer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../store";

const AnswerList = (props) => {
  const dispatch = useDispatch();
  const activeAnswers = useSelector((state) => state[props.questionID].answers);
  const [style1, setStyle1] = useState({});

  const selected = () => {
    setStyle1({
      transform: "translateX(-100%)",
      transition: "transform 0.5s ease-in-out",
    });

    setTimeout(() => {
      setStyle1({ transform: "translateX(100%)", transition: "0s" });
    }, 500);
  };

  const editAnswerText = (event, index) => {
    const payload = {
      qID: props.questionID,
      newText: event.target.value,
      index: index,
    };
    dispatch(questionActions.editAnswer(payload));
  };

  return (
    <div className="column" key={"answers"}>
      {activeAnswers.map((dAnswer, index) => {
        return (
          <Answer
            key={"Answer" + index}
            index={index}
            value={dAnswer}
            style1={style1}
            style2={props.style2}
            selected={selected}
            qID={props.questionID}
          ></Answer>
        );
      })}
    </div>
  );
};

export default AnswerList;
