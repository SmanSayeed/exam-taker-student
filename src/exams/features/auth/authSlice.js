import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  message: null,
  token: null,
  student: null,
};

// Helper to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Persist state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("auth", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadState(), // Load persisted state on startup
  reducers: {
    loggedIn: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.student = action.payload.student;
      saveState(state); // Save state to localStorage on login
    },
    loggedOut: (state) => {
      state.status = null;
      state.message = null;
      state.token = null;
      state.student = null;
      localStorage.removeItem("auth"); // Remove from localStorage on logout
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;