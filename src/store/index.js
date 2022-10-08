import { createSlice, configureStore } from "@reduxjs/toolkit";

const dummyQuestionList = [
  {
    title: "Who's the best dog?",
    answers: ["Doug", "Remmy", "Clifford"],
    correctAnswers: [1],
  },
  {
    title: "Who's the best wife?",
    answers: ["Jessamy", "No contest", "Jessamy"],
    correctAnswers: [0, 2],
  },
  {
    title: "Who is the best husband?",
    answers: ["Bandit", "Matthew", "Vadar"],
    correctAnswers: [1],
  },
];

let dummyQuestionList2 = localStorage.getItem("Questions");

dummyQuestionList2 = JSON.parse(dummyQuestionList2);

const startingQuestionList = dummyQuestionList2 || [
  { title: "", answers: [""], correctAnswers: [] },
];

const questionsSlice = createSlice({
  name: "questions",
  initialState: startingQuestionList,
  reducers: {
    setDummyList(state) {
      for (let i = 0; i < dummyQuestionList.length; i++)
        state[i] = dummyQuestionList[i];
    },
    addQuestion(state) {
      state.push({ title: "", answers: [], correctAnswers: [] });
    },
    addAnswer(state, action) {
      const qID = action.payload;

      state[qID]["answers"].push("");
    },
    removeQuestion(state, action) {
      const qID = action.payload.qID;
      state.splice(qID, 1);
    },
    removeAnswer(state, action) {
      const qID = action.payload.qID;
      const index = action.payload.index;
      const length = action.payload.length;

      state[qID]["answers"].splice(index, 1);

      for (let i = length - 1; i >= 0; i--) {
        if (state[qID].correctAnswers[i] === index) {
          state[qID].correctAnswers.splice(i, 1);
        } else if (state[qID].correctAnswers[i] > index) {
          state[qID].correctAnswers[i]--;
        }
      }
    },
    editTitle(state, action) {
      const newTitle = action.payload.newTitle;
      const qID = action.payload.qID;

      state[qID].title = newTitle;
    },
    editAnswer(state, action) {
      const newText = action.payload.newText;
      const qID = action.payload.qID;
      const index = action.payload.index;

      state[qID].answers[index] = newText;
    },
    addCorrectAnswer(state, action) {
      const qID = action.payload.qID;
      const index = action.payload.index;

      state[qID].correctAnswers.push(index);
    },
    removeCorrectAnswer(state, action) {
      const qID = action.payload.qID;
      const index = action.payload.index;
      let tempAnswers = action.payload.currentAnswers;

      tempAnswers = tempAnswers.filter((item) => item !== index);
      state[qID].correctAnswers = tempAnswers;
    },
  },
});

const store = configureStore({
  reducer: questionsSlice.reducer,
});

export const questionActions = questionsSlice.actions;

export default store;
