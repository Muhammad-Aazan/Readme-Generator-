import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import generatorReducer from '../features/generator/generatorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    generator: generatorReducer
  }
});

export default store;