import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasksSlice";
import themeSlice from "./slices/themeSlice";
import newTaskSlice from "./slices/newTaskSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    tasks: tasksSlice,
    newTask: newTaskSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
