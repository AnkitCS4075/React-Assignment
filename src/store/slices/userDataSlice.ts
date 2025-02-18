import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  id: string
  name: string
  address: string
  email: string
  phone: string
}

interface UserDataState {
  data: UserData | null
  hasUnsavedChanges: boolean
}

const initialState: UserDataState = {
  data: null,
  hasUnsavedChanges: false
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload
      state.hasUnsavedChanges = false
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload }
      } else {
        state.data = action.payload as UserData
      }
      state.hasUnsavedChanges = true
    },
    loadUserData: (state) => {
      const savedData = localStorage.getItem('userData')
      if (savedData) {
        try {
          state.data = JSON.parse(savedData)
          state.hasUnsavedChanges = false
        } catch (error) {
          console.error('Error loading user data:', error)
          state.data = null
          state.hasUnsavedChanges = false
        }
      }
    },
    resetUnsavedChanges: (state) => {
      state.hasUnsavedChanges = false
    }
  },
})

export const { saveUserData, updateUserData, loadUserData, resetUnsavedChanges } = userDataSlice.actions
export default userDataSlice.reducer 