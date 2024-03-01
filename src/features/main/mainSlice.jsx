import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from 'api/axios';

export const selectData = state => state.main

// GET METHOD

export const getUserPosts = createAsyncThunk(
    "userPosts/getUserPosts",
    async (_, thunkAPI) => {
        try {
            const res = await API.get("/images", {
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to get user posts")
        }
    }
)

// POST METHOD

export const postUserData = createAsyncThunk(
    "userData/postUserData",
    async (req, thunkAPI) => {
        try {
            const res = await API.post("/images", req, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to post user data")
        }
    }
)

// UPDATE METHOD

export const updateUserData = createAsyncThunk(
    "userData/updateUserData",
    async (newData, thunkAPI) => {
        const { image } = newData;
        try {
            const res = await API.put(`/images/${image.id}`, image, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to update user data")
        }
    }
)

// DELETE METHOD

export const deleteUserData = createAsyncThunk(
    "userData/deleteUserData",
    async (id, thunkAPI) => {
        try {
            const res = await API.delete(`/images/${id}`)
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to delete user data")
        }
    }
)

const initialState = {
    activeHeart: null,
    anchorEl: null,
    title: null,
    image: null,
    error: null,
    id: null,
    isOpen: false,
    loading: false,
    description: [],
    addedData: [],
    images: [],
    email: '',
    password: '',
    errMsg: '',
    successMsg: '',
}

const mainSlice = createSlice({
    name: 'auth/main_section',
    initialState,
    reducers: {
        saveCreatedPosts(state, action) {
            state.image = action.payload.image;
            state.title = action.payload.title;
            state.id = action.payload.id;
        },
        setErrMsg(state, action) {
            state.errMsg = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setIsLoading(state, action) {
            state.loading = action.payload
        },
        setIsOpen(state, action) {
            state.isOpen = action.payload
        },
        setDescription(state, action) {
            state.description = action.payload
        },
        setSuccessMsg(state, action) {
            state.successMsg = action.payload
        },
        setAddedData(state, action) {
            state.addedData = action.payload
        },
        setAnchorEl(state, action) {
            state.anchorEl = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getUserPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.images = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // UPDATE
            .addCase(updateUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.images = state.images.map(item => item.id !== action.payload.id ? item : action.payload);
                state.loading = false;
                state.error = null
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // DELETE
            .addCase(deleteUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUserData.fulfilled, (state, action) => {
                state.images = state.images.filter(item => item.id !== action.payload.id);
                state.loading = false;
                state.error = null
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const {
    saveCreatedPosts, setErrMsg, setPassword, setEmail, setIsOpen,
    setIsLoading, setDescription, setAnchorEl, setAddedData,
    setImages, setSuccessMsg } = mainSlice.actions;

export default mainSlice.reducer;