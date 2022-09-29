import Card from "../UI/Card";
import "./QuestionItem.css";
import AnswerItem from "./AnswerItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../store";

const AnswersList = (props) => {
  const dispatch = useDispatch();
  const activeAnswers = useSelector((state) => state[props.questionID].answers);

  const editAnswerText = (event, index) => {
    const payload = {
      qID: props.questionID,
      newText: event.target.value,
      index: index,
    };
    dispatch(questionActions.editAnswer(payload));
  };

  return (
    <div className="column" key={props.quesionID + "answers"}>
      {activeAnswers.map((dAnswer, index) => {
        return (
          <AnswerItem
            key={index.toString() + props.questionID.toString()}
            index={index}
            value={dAnswer}
            change={(event) => editAnswerText(event, index)}
          ></AnswerItem>
          // <input
          //   key={index.toString() + props.questionID.toString()}
          //   className="qAnswer"
          //   onChange={(event) => editAnswerText(event, index)}
          //   value={dAnswer}
          //   placeholder={"Enter Answer Text"}
          //   style={newStyle}
          // />
        );
      })}
    </div>
  );
};

export default AnswersList;
