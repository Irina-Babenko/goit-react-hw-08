import { createSelector } from "@reduxjs/toolkit";
import { selectQueryFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectContactsLoading = (state) => state.contacts.loading;

export const selectContactsError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectQueryFilter],
  (contacts, query) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.number.includes(query)
    );
  }
);
