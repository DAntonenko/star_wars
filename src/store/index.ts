import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';
import planetsReducer from './planetsSlice';
import speciesReducer from './speciesSlice';
import { personReducer } from './personSlice';


const store = configureStore({
  reducer: {
    people: peopleReducer,
    planets: planetsReducer,
    species: speciesReducer,
    person: personReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
