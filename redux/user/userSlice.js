import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  id: null,
  username: '',
  email: '',
  password: '',
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.userId;
      state.username = action.payload.username || ''; // Add username if available
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearUser(state) {
      state.id = null;
      state.username = '';
      state.email = '';
      state.password = '';
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
