import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message, Messages } from "../types/message";

export const fetchMessages = createAsyncThunk<Messages, void, { rejectValue: string }>(
    'messages/fetchMessages',
    async function (_, {rejectWithValue}) {
        try {   
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
            if (!response.ok) {
                throw new Error('Server error');
            }
    
            const data : Messages = await response.json();
            return data;

            } catch (err) {
                if (err instanceof Error) {
                    return rejectWithValue(err.message);
                }
                return rejectWithValue('Unknown error');
            }
    }
);

export type messagesProcess = {
    messages: Messages,
    isLoading: boolean,
    isError: boolean,
    currentDialogue: Message,
};

const defaultMessages: Messages = [];

const initialState: messagesProcess = {
    messages: defaultMessages,
    isLoading: false,
    isError: false,
    currentDialogue: defaultMessages[0] ?? {    
        postId: 0,
        id: 0,
        name: '',
        email: '',
        body: ''
    },
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload
        })
    }
})

export default messageSlice.reducer;