// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  profile: string | null;
  userData: {
    name: string;
    email: string;
    token: string;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  token: null,
  profile: null,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string, token: string }>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
      state.token = action.payload.token
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
    },
    setLoading(state, action: PayloadAction<boolean>){
      state.isLoading = action.payload
    },
    setProfile(state, action: PayloadAction<{profile: string}>){
      state.profile = action.payload.profile
    }
  },
});

export const { login, logout, setLoading, setProfile } = userSlice.actions;
export default userSlice.reducer;
