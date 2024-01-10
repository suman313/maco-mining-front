import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../slicers/UserSlice'

export const store = configureStore({
  reducer: {
    authentication: UserSlice
  },
})