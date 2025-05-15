import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Messages } from "../types/message";
import { State } from "../types/state";

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

export const sendMessage = createAsyncThunk<void, string, { state: State, rejectValue: string, }>(
    'messages/sendMessage',
    async function (text, {rejectWithValue, dispatch, getState}) {
        const state = getState() as State;
        const currentChat = state.messagesData.currentDialogue;
        try {
            const message = {
                ...currentChat,
                id: -1,
                body: text,
                name: 'Вы',
            }

            const response = await fetch(`https://jsonplaceholder.typicode.com/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message)
            })

            if (!response.ok) {
                throw new Error('Can not send message for some reason');
            }

            const data = await response.json();

            dispatch(addMessage(data))


        } catch (err) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
)

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
    currentDialogue: defaultMessages[0],
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<string>) => {
            const currentUser = state.messages.find((messageObj) => messageObj.email === action.payload)

            if (currentUser) {
                state.currentDialogue = currentUser;
            } else {
                state.currentDialogue = defaultMessages[0];
            }
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            console.log(action.payload)
            state.messages.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload;
        })
        .addCase(sendMessage.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendMessage.fulfilled, (state) => {
            state.isLoading = false;
        })
    }
})

export const { setActiveChat, addMessage } = messageSlice.actions;

export default messageSlice.reducer;