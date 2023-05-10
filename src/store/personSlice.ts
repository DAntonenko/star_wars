import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type personState = {
  personShown: string | null
};

const initialState: personState = {
  personShown: null
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    showPerson(store, action: PayloadAction<string | null>) {
      store.personShown = action.payload;
    }
  }
});

export const { reducer: personReducer, actions: personActions } = personSlice;
