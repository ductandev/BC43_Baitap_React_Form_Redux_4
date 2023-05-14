// Cài thư viện redux
// npm install @reduxjs/toolkit
// npm install react-redux
import { configureStore } from '@reduxjs/toolkit'
import sinhVienReducer from './reducers/sinhVienReducer';

export const store = configureStore({
    reducer: {
        sinhVienReducer: sinhVienReducer,
    }
});