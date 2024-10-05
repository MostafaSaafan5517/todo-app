import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) =>
      (state = action.payload),
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
