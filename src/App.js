import "./App.css";
import Card from "./UI/Card";
import QuestionItem from "./QuestionItem/QuestionItem";
import { questionActions } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state);

  const addQuestionHandler = () => {
    dispatch(questionActions.addQuestion());
  };

  return (
    <div className="App">
      <button className="addQuestion" onClick={addQuestionHandler}>
        Add Question
      </button>
      {questions.map((question, index) => {
        return (
          <QuestionItem
            key={"Question ID " + index}
            questionID={index}
          ></QuestionItem>
        );
      })}
    </div>
  );
}

export default App;
