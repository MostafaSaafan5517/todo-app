import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NewTaskState {
  inputValue: string;
  check: boolean;
}

const initialState: NewTaskState = {
  inputValue: "",
  check: false,
};

const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setCheck: (state, action: PayloadAction<boolean>) => {
      state.check = action.payload;
    },
  },
});

export const { setInputValue, setCheck } = newTaskSlice.actions;

export default newTaskSlice.reducer;
