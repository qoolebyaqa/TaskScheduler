import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TaskItem } from '../assets/util/types';

const TaskSlice = createSlice({
  name: "TasksRelated",
  initialState: {tasks: [], filtredLengths: {active: 0, completed: 0, failed: 0}, activeFilter: 'active', showNewTaskForm: false, activeUser: ''},
  reducers: {
    newTaskForm(state) {
      state.showNewTaskForm = !state.showNewTaskForm;
      document.body.style.overflow = state.showNewTaskForm ? 'hidden' : '';
      
    },
    tasksUpdater(state, action) {
      state.tasks = action.payload;
    },
    newTaskAdd(state:any, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    changeActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },
    filterOfTotalTasks(state) {
      state.filtredLengths = {...state.filtredLengths,
      active: state.tasks.filter((task:TaskItem) => task.stage === 'active').length,
      completed: state.tasks.filter((task:TaskItem) => task.stage === 'completed').length,
      failed: state.tasks.filter((task:TaskItem) => task.stage === 'failed').length,
      }
    },
    markAsCompleted(state, action) {
      state.tasks = action.payload;
    },
    markAsFailed(state, action) {
      state.tasks = action.payload;
    },
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    }
  }
})


const store = configureStore({
  reducer: {tasksRelated: TaskSlice.reducer}
})

export const newTaskActions = TaskSlice.actions;
export default store;