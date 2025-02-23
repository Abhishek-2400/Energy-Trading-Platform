import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  profile: false,
  token: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      //state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },


    signOutUserSuccess: (state) => {
      state.currentUser = null;

    },
    tokenSuccess: (state, action) => {
      state.token = action.payload;
    },
    tokenMinus: (state, action) => {
      state.token -= action.payload;
    }

  },
});

export const {

  signInSuccess,
  signOutUserSuccess,
  tokenSuccess,
  tokenMinus,

} = userSlice.actions;

export default userSlice.reducer;
