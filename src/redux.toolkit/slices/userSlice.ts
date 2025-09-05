// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserData {
  name: string;
  email: string;
  token: string;
  id: string;
  drivingLicence: string;
}

interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  profile: string | null;
  userData: UserData | null;
}


const initialState: Partial<UserState>  = {
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
    login(state, action: PayloadAction<{ name: string; email: string, token: string, id: string }>) {
      state.isLoggedIn = true;
      state.userData = action.payload as any
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
    },
    setUserData(state, action: PayloadAction<Partial<UserData>>){
      if (state.userData) {
        state.userData = {
        ...state.userData,
        ...action.payload,
      }
      }
    },
    setDrivingLicense(state, action: PayloadAction<{drivingLicence: string}>){
      if (state.userData) {
        state.userData = {
          ...state.userData,
          drivingLicence: action.payload.drivingLicence
        }
      }
    },
    clearUserData(state) {
      state.userData = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    
  },
});

export const { login, logout, setLoading, setProfile, setUserData, setDrivingLicense, clearUserData } = userSlice.actions;
export default userSlice.reducer;
