import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialIdToken = localStorage.getItem("token");
const initialAuthState = {
  token: initialIdToken,
  isLoggedIn: !!initialIdToken,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;

      // localStorage.setItem('token',state.token)
    },
    logout(state, action) {
      state.token = action.payload;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("data");
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
export const authActions = authSlice.actions;
export default store;