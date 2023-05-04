import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Planets, IPlanet } from 'swapi-ts';

const getPlanetsFromAllPages = async () => {
  const planetsFromAllPages: IPlanet[] = [];

  for (let pageNum = 1; pageNum < 7; pageNum++) {
    await Planets.getPage(pageNum).then(res => planetsFromAllPages.push(...res.results));
  }

  return planetsFromAllPages;
};

export const getPlanetsData = createAsyncThunk<IPlanet[], undefined, {rejectValue: string}>(
  'planetsData/getPlanetsData',
  getPlanetsFromAllPages
);

type planetsState = {
  planetsData: IPlanet[],
  status: string | null,
  error: string | null | undefined,
};

const initialState: planetsState = {
  planetsData: [],
  status: null,
  error: null,
};

const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPlanetsData.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(getPlanetsData.fulfilled, (state, action) => {
          state.status = `updated: ${new Date().toString()}`;
          state.planetsData = action.payload;
          state.error = null;
        })
        .addCase(getPlanetsData.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload;
        });
    },
});

export default planetsSlice.reducer;
