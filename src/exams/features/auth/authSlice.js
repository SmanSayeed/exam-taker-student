import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    message: null,
    access_token: null,
    admin_user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.access_token = action.payload?.access_token;
            state.admin_user = action.payload?.admin_user;
        },
        userLoggedOut: (state) => {
            state.status = null;
            state.message = null;
            state.access_token = null;
            state.admin_user = null;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
