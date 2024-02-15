import { configureStore } from "@reduxjs/toolkit"
import signInReducer from "features/auth/sign_in/signInSlice"
import signUpReducer from "features/auth/sign_up/signUpSlice"

const store = configureStore({
  reducer: {
    signIn: signInReducer,
    signUp: signUpReducer,
  },
})

export default store
