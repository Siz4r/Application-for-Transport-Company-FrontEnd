import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createConv, getContacts, getConv, onConvReceived } from "./api";
import { Contact, Conversation } from "./type";

// const onMessageReceived = (payload: any) => {

//   addMessageToConversation({
//     conversationId: body.conversationId,
//     text: body.text,
//     senderId: body.senderId,
//   });
// };

const addMessageToConversation = createAsyncThunk<
  { conversationId: string; text: string; senderId: string },
  { payload: any },
  {}
>("conversations/addMessage", async (data, thunkAPI) => {
  const body = JSON.parse(data.payload.body);
  return body;
});

export interface IchatSlice {
  loading: boolean;
  contacts: Contact[];
  conversations: Conversation[];
}

export const chatSlice = createSlice<IchatSlice, {}>({
  name: "employees",
  initialState: {
    loading: false,
    contacts: [],
    conversations: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });

    builder.addCase(getConv.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });

    builder.addCase(createConv.fulfilled, (state, action) => {
      // const args = action.meta.arg;
      // const contacts = state.contacts.filter((c) => args.users.includes(c.id));
      // state.conversations = [
      //   ...state.conversations,
      //   {
      //     conversationName: args.name,
      //     users: contacts,
      //     messages: [],
      //     conversationId: action.payload.conversationId,
      //   },
      // ];
    });

    builder.addCase(addMessageToConversation.fulfilled, (state, action) => {
      const payload = action.payload;
      const newMessage = { senderId: payload.senderId, text: payload.text };
      state.conversations = state.conversations.map((conversation) => {
        if (conversation.conversationId === payload.conversationId) {
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });
    });

    builder.addCase(onConvReceived.fulfilled, (state, action) => {
      const args = action.payload;

      state.conversations = [
        ...state.conversations,
        {
          conversationName: args.conversationName,
          users: args.users,
          messages: [],
          conversationId: action.payload.conversationId,
        },
      ];
    });

    builder.addMatcher(
      isAnyOf(
        getContacts.pending,
        getConv.pending,
        createConv.pending,
        onConvReceived.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getContacts.fulfilled,
        getContacts.rejected,
        getConv.fulfilled,
        getConv.rejected,
        createConv.fulfilled,
        createConv.rejected,
        onConvReceived.fulfilled,
        onConvReceived.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
