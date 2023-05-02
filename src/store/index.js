import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';
import personReducer from './personSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    person: personReducer,
  }
});

export default store;
