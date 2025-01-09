import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  id: null,
  email: "",
  username: "",
  status: "",
  token: "",
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.userId;
      state.email = action.payload.email;
      state.username = action.payload.username || "";
      state.status = action.payload.status;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.id = null;
      state.email = "";
      state.username = "";
      state.status = "";
      state.token = "";
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
