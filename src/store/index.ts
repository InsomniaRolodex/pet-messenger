import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './slice';

export const store = configureStore({
    reducer: {
        messagesData: messageReducer
    }
})