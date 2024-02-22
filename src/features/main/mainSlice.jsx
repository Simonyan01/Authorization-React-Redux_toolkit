import { createSlice } from '@reduxjs/toolkit';

export const selectData = state => state.main

const initialState = {
    image: null,
    title: null,
    id: null,
    isOpen: false,
    descriptions: [],
    addedData: [],
    images: []
}

const mainSlice = createSlice({
    name: 'auth/sign_up',
    initialState,
    reducers: {
        saveCreatedPosts(state, action) {
            state.image = action.payload.image;
            state.title = action.payload.title;
            state.id = action.payload.id;
        },
        setIsOpen(state) {
            state.isOpen = !state.isOpen
        },
        setDescriptions(state, action) {
            state.descriptions = action.payload
        },
        setAddedData(state, action) {
            state.addedData = action.payload
        },
        setImages(state, action) {
            state.images = action.payload
        },
    }
});

export const { saveCreatedPosts, setIsOpen, setDescriptions, setAddedData, setImages } = mainSlice.actions;

export default mainSlice.reducer;