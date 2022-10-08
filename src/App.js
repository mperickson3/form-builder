import "./App.css";
import Card from "./UI/Card";
import QuestionItem from "./QuestionItemEdit/QuestionItem";
import { questionActions } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Question from "./QuestionItemPlay/Question";

function App() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state);
  const [editMode, setEditMode] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const testText = ["Text1", "Text2"];

  const addQuestionHandler = () => {
    dispatch(questionActions.addQuestion());
  };

  const playForm = () => {
    setEditMode((prevState) => {
      return !prevState;
    });
    setCurrentQuestion(0);
  };

  const dummyQList = () => {
    dispatch(questionActions.setDummyList());
  };

  const saveForm = () => {
    localStorage.setItem("Questions", JSON.stringify(questions));
  };

  return (
    <div className="App">
      <button className="addQuestion" onClick={playForm}>
        Toggle Mode
      </button>
      {editMode && (
        <button className="addQuestion" onClick={addQuestionHandler}>
          Add Question
        </button>
      )}
      <button
        className="addQuestion"
        onClick={dummyQList}
        style={{ content: "Helloooo 2" }}
      >
        Fill in dummy list
      </button>
      <button className="addQuestion" onClick={saveForm}>
        Save Form
      </button>

      {editMode &&
        questions.map((question, index) => {
          return (
            <QuestionItem
              key={"Question ID " + index}
              questionID={index}
            ></QuestionItem>
          );
        })}
      {!editMode && (
        <Question
          key={"Question ID "}
          questionID={currentQuestion}
          quizLength={questions.length}
        ></Question>
      )}
    </div>
  );
}

export default App;
