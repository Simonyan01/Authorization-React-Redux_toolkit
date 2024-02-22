import { createSlice } from '@reduxjs/toolkit';

export const selectData = state => state.signIn

const initialState = {
    userEmail: '',
    userPwd: '',
    errMsg: '',
    loading: false,
    open: false
}

const signInSlice = createSlice({
    name: 'auth/sign_in',
    initialState,
    reducers: {
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

export const { setUserEmail, setUserPwd, setErrMsg, setLoading, setOpen } = signInSlice.actions;

export default signInSlice.reducer;