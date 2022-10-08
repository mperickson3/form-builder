import "./QuestionItem.css";
import AnswerItem from "./AnswerItem";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../store";
import { getByDisplayValue } from "@testing-library/react";

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

  const removeAnswer = (event, index) => {
    const payload = {
      qID: props.questionID,
      index: index,
      length: activeAnswers.length,
    };
    dispatch(questionActions.removeAnswer(payload));
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
            questionID={props.questionID}
            removeAnswer={(event) => removeAnswer(event, index)}
          ></AnswerItem>
        );
      })}
    </div>
  );
};

export default AnswersList;
