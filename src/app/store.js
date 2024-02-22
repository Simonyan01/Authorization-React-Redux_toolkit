import { configureStore } from "@reduxjs/toolkit"
import signInReducer from "features/auth/sign_in/signInSlice"
import signUpReducer from "features/auth/sign_up/signUpSlice"
import mainReducer from "features/main/mainSlice"

const store = configureStore({
  reducer: {
    signIn: signInReducer,
    signUp: signUpReducer,
    main: mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
