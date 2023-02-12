import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface themeState {
  theme: string
}
const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialState: themeState = {
  theme: defaultDark ? "dark" : "light",
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setToDark: (state) => {
      state.theme = "dark"
    },
    setToLight: (state) => {
      state.theme = "light"
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToDark, setToLight, setTo} = themeSlice.actions

export default themeSlice.reducer