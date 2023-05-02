import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { People } from 'swapi-ts';

const getPeopleFromAllPages = () => {

  // function getPeopleFromPage() {
  //   const peopleFromAllPages = [];
  //   People.getPage().then(res => {
  //     if (!res.next) {
  //       console.log('net', res.next);
  //       peopleFromAllPages.push(...res.results);
  //     } else {
  //       const nextPageNum = Number(res.next?.replace(/\D/g, ''));
  //       console.log('est!', nextPageNum);
  //       // getPeopleFromPage(nextPageNum);
  //       peopleFromAllPages.push(...res.results);
  //       console.log(peopleFromAllPages);
  //     };
  //     return peopleFromAllPages;
  //   });

  //   return peopleFromAllPages;
  // }

  // console.log('getPeopleFromPage', getPeopleFromPage());
  // return getPeopleFromPage();

  const peopleFromAllPages =[];
  for (let pageNum = 1; pageNum < 10; pageNum++) {
    People.getPage(pageNum).then(res => peopleFromAllPages.push(...res.results));
  }
  return peopleFromAllPages;
};

export const getPeopleData = createAsyncThunk(
  'peopleData/getPeopleData',
  getPeopleFromAllPages
);

const peopleSlice = createSlice({
    name: 'people',
    initialState: {
      peopleData: [],
      status: null,
      error: null,
    },
    extraReducers: {
      [getPeopleData.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
      },
      [getPeopleData.fulfilled]: (state, action) => {
        state.status = `updated: ${new Date().toString()}`;
        state.peopleData = action.payload;
        state.error = null;
      },
      [getPeopleData.rejected]: (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      },
    },
});

export default peopleSlice.reducer;
