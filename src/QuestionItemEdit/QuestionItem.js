import "./QuestionItem.css";
import Card from "../UI/Card.js";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../store";
import AnswersList from "./AnswersList";
import { useState, useEffect } from "react";

const QuestionItem = (props) => {
  const newStyle = { width: "2rem", height: "2rem", fontSize: "x-large" };
  const dispatch = useDispatch();
  const activeQuestion = useSelector((state) => state[props.questionID]);

  const buttonHandler = () => {
    dispatch(questionActions.addAnswer(props.questionID));
  };

  const titleEditHandler = (event) => {
    const payload = { qID: props.questionID, newTitle: event.target.value };
    dispatch(questionActions.editTitle(payload));
  };

  const removeQuestionHandler = () => {
    dispatch(questionActions.removeQuestion({ qID: props.questionID }));
  };

  return (
    <Card key={props.questionID}>
      <div className="column">
        <button className="removeQuestion" onClick={removeQuestionHandler}>
          x
        </button>

        <input
          className="qTitle"
          key={"Question Title " + props.questionID}
          value={activeQuestion.title}
          placeholder={"Enter Title"}
          onChange={titleEditHandler}
        />

        <AnswersList
          questionID={props.questionID}
          activeQuestionAnswers={activeQuestion.answers}
        ></AnswersList>
        <button
          key={"button" + props.questionID}
          className="addAnswer"
          onClick={buttonHandler}
          style={newStyle}
        >
          +
        </button>
      </div>
    </Card>
  );
};

export default QuestionItem;
