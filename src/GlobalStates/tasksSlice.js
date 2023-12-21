import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        // initial tasks here
    ],
    selectedTasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleTask: (state, action) => {
            const id = action.payload;
            state.selectedTasks = state.selectedTasks.includes(id)
                ? state.selectedTasks.filter((taskId) => taskId !== id)
                : [...state.selectedTasks, id];
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    },
});

export const { toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;