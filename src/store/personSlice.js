import { createSlice } from '@reduxjs/toolkit';

const personSlice = createSlice({
  name: 'person',
  initialState: {
    personShown: null
  },
  reducers: {
    showPerson(store, action) {
      store.personShown = action.payload;
    }
  }
});

export const { showPerson } = personSlice.actions;
export default personSlice.reducer;
