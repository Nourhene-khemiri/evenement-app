import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../src/services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem('token', data.token);
    return data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const data = await authService.register(userData);
    localStorage.setItem('token', data.token);
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;