import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import userDataReducer from './slices/userDataSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userData: userDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 