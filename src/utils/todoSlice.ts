import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string | number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

// Utility function to load state from local storage
const loadState = (): TodoState => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return { todos: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { todos: [] };
  }
};

// Utility function to save state to local storage
const saveState = (state: TodoState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState: TodoState = loadState();

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const userUUID = uuidv4();
      const todo: Todo = {
        id: userUUID,
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
      saveState(state);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveState(state);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveState(state);
    },
    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
      saveState(state);
    },
    updateTodoOrder: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      saveState(state);
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo, updateTodoOrder } = todoSlice.actions;

export default todoSlice.reducer;