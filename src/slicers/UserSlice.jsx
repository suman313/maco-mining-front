import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem("userAuth"),
  role: localStorage.getItem("role"),
  xToken: localStorage.getItem("role")=="admin"?localStorage.getItem("admin_access_token"):localStorage.getItem("user_access_token")
}

export const UserSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload
      console.log(action.payload);
    },

    setToken: (state, action) => {
        state.xToken = action.payload
        console.log(action.payload);
    }
  },
})

export const {setUser, setToken} = UserSlice.actions

export default UserSlice.reducer