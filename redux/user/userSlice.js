import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  id: null,
  username: '',
  email: '',
  avatar: '', // Add avatar to initial state
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // Set user data in the Redux store
      state.id = action.payload.userId;
      state.username = action.payload.username || ''; // Add username if available
      state.email = action.payload.email;
      state.avatar = action.payload.avatar || ''; // Set avatar
    },
    clearUser(state) {
      // Clear user data in the Redux store
      state.id = null;
      state.username = '';
      state.email = '';
      state.avatar = ''; // Reset avatar
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
