import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUser: (state,payload) => {
      state = payload.payload;
      return state;
    },
    removeUser: (state) => {
        state = null;
        return state;
    },
  }
});

// Action creators are generated for each case reducer function
export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;