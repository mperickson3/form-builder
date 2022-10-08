import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../store";

const AnswerItem = (props) => {
  const [newStyle, setNewStyle] = useState({});
  const [buttonIcon, setButtonIcon] = useState("+");
  const dispatch = useDispatch();
  const correctAnswers = useSelector(
    (state) => state[props.questionID].correctAnswers
  );

  useEffect(() => {
    setNewStyle({
      width: "60vw",
    });
    if (correctAnswers.includes(props.index)) {
      setNewStyle({
        width: "60vw",
        backgroundColor: "Green",
      });
      setButtonIcon("-");
    }
  }, [correctAnswers]);

  const removeAnswerHandler = () => {
    setNewStyle({
      transition: "0.5s ease-in-out",
      width: "0px",
      height: "0px",
    });
    setTimeout(() => {
      props.removeAnswer(props.index);
      setNewStyle({ transition: "0s", width: "60vw" });
    }, 380);
  };

  const toggleAnswer = () => {
    const payload = {
      qID: props.questionID,
      index: props.index,
      currentAnswers: correctAnswers,
    };
    if (correctAnswers.includes(props.index)) {
      dispatch(questionActions.removeCorrectAnswer(payload));
      setButtonIcon("+");
    } else {
      dispatch(questionActions.addCorrectAnswer(payload));
      setButtonIcon("-");
    }
  };

  return (
    <div className="row">
      <button className="removeAnswer" onClick={removeAnswerHandler}>
        -
      </button>
      <input
        className="qAnswer"
        placeholder={"Enter Answer Text"}
        key={props.questionID}
        value={props.value}
        onChange={props.change}
        style={newStyle}
      />
      <button onClick={toggleAnswer} className="toggleAnswer">
        {buttonIcon}
      </button>
    </div>
  );
};

export default AnswerItem;
