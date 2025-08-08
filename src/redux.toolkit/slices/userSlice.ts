// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userData: {
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
