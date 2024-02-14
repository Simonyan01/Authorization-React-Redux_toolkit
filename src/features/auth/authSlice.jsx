import { createSlice } from '@reduxjs/toolkit';

export const selectAuthData = state => state.auth

const initialState = {
    pwd: '',
    userEmail: '',
    signInErrMsg: '',
    signUpErrMsg: '',
    loading: false,
    email: null,
    token: null,
    id: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
        setUserEmail(state, action) {
            state.userEmail = action.payload;
        },
        setUserPwd(state, action) {
            state.pwd = action.payload
        },
        setSignInErrMsg(state, action) {
            state.signInErrMsg = action.payload
        },
        setSignUpErrMsg(state, action) {
            state.signUpErrMsg = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    }
});

export const { setUser, removeUser, setUserEmail, setUserPwd, setSignInErrMsg, setSignUpErrMsg, setLoading } = authSlice.actions;

export default authSlice.reducer;