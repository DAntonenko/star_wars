import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Species, ISpecie } from 'swapi-ts';

const getSpeciesFromAllPages = async () => {
  const speciesFromAllPages: ISpecie[] = [];

  for (let pageNum = 1; pageNum < 5; pageNum++) {
    await Species.getPage(pageNum).then(res => speciesFromAllPages.push(...res.results));
  }

  return speciesFromAllPages;
};

export const getSpeciesData = createAsyncThunk<ISpecie[], undefined, {rejectValue: string}>(
  'speciesData/getSpeciesData',
  getSpeciesFromAllPages
);

type speciesState = {
  speciesData: ISpecie[],
  status: string | null,
  error: string | null | undefined,
};

const initialState: speciesState = {
  speciesData: [],
  status: null,
  error: null,
};

const speciesSlice = createSlice({
    name: 'species',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getSpeciesData.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(getSpeciesData.fulfilled, (state, action) => {
          state.status = `updated: ${new Date().toString()}`;
          state.speciesData = action.payload;
          state.error = null;
        })
        .addCase(getSpeciesData.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload;
        });
    },
});

export default speciesSlice.reducer;
