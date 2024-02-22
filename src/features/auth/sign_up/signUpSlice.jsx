import { createSlice } from '@reduxjs/toolkit';

export const selectData = state => state.signUp

const initialState = {
    userEmail: '',
    userPwd: '',
    errMsg: '',
    loading: false,
    open: false,
    email: null,
    token: null,
    id: null,
}

const signUpSlice = createSlice({
    name: 'auth/sign_up',
    initialState,
    reducers: {
        saveCreatedUser(state, action) {
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
            state.userPwd = action.payload
        },
        setErrMsg(state, action) {
            state.errMsg = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setOpen(state, action) {
            state.open = action.payload
        }
    }
});

export const { saveCreatedUser, setOpen, removeUser, setUserEmail, setUserPwd, setErrMsg, setLoading } = signUpSlice.actions;

export default signUpSlice.reducer;