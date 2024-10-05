import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TasksState {
  all: object[];
  active: object[];
  completed: object[];
  uncompleted: number;
}

const initialState: TasksState = {
  all: [],
  active: [],
  completed: [],
  uncompleted: 0,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<any[]>) => {
      state.all = action.payload;
    },

    clearCompleted: (state) => {
      state.all = state.all.filter((task: any) => !task.completed);
      return state;
    },

    addNewTask: (state, action: PayloadAction<any>) => {
      state.all.push(action.payload);
      if (action.payload.completed) {
        state.completed.push(action.payload);
      } else {
        state.active.push(action.payload);
      }
    },

    deleteTask: (state, action: PayloadAction<any>) => {
      state.all = state.all.filter((task: any) => task.id !== action.payload);
      updateTasks(state.all);
    },

    editTask: (state, action: PayloadAction<any>) => {
      state.all = state.all.map((task: any) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    },
  },
});

export const { updateTasks, clearCompleted, addNewTask, deleteTask, editTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
