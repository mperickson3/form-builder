import { createSlice, configureStore } from "@reduxjs/toolkit";

const dummyQuestionList = [{ title: "", answers: [""] }];

const questionsSlice = createSlice({
  name: "questions",
  initialState: dummyQuestionList,
  reducers: {
    addQuestion(state) {
      state.push({ title: "", answers: [] });
    },
    addAnswer(state, action) {
      const qID = action.payload;

      state[qID]["answers"].push("");
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
  },
});

const store = configureStore({
  reducer: questionsSlice.reducer,
});

export const questionActions = questionsSlice.actions;

export default store;
