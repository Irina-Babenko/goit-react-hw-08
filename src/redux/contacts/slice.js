import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, actions) => {
  state.loading = false;
  state.error = actions.payload;
};

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = null;
        state.items = actions.payload;
      })

      .addCase(addContact.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = null;
        state.items.push(actions.payload);
      })

      .addCase(deleteContact.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = null;
        const idx = state.items.findIndex(
          (contact) => contact.id === actions.payload.id
        );
        state.items.splice(idx, 1);
      })

      .addCase(editContact.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = null;
        const idx = state.items.findIndex(
          (contact) => contact.id === actions.payload.id
        );
        if (idx !== -1) {
          state.items[idx] = actions.payload;
        }
      })

      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.items = [];
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          editContact.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          editContact.rejected
        ),
        handleRejected
      );
  },
});

export default slice.reducer;
