import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { People, IPeople } from 'swapi-ts';

const getPeopleFromAllPages = () => {
  const peopleFromAllPages: IPeople[] = [];

  for (let pageNum = 1; pageNum < 10; pageNum++) {
    People.getPage(pageNum).then(res => peopleFromAllPages.push(...res.results));
  };

  return peopleFromAllPages;
};

export const getPeopleData = createAsyncThunk<IPeople[], undefined, {rejectValue: string}>(
  'peopleData/getPeopleData',
  getPeopleFromAllPages
);

type peopleState = {
  peopleData: IPeople[],
  status: string | null,
  error: string | null | undefined,
};

const initialState: peopleState = {
  peopleData: [],
  status: null,
  error: null,
};

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPeopleData.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(getPeopleData.fulfilled, (state, action) => {
          state.status = `updated: ${new Date().toString()}`;
          state.peopleData = action.payload;
          state.error = null;
        })
        .addCase(getPeopleData.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload;
        });
    },
});

export default peopleSlice.reducer;
