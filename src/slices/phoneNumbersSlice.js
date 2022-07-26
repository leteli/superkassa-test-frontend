import { createSlice } from '@reduxjs/toolkit';

// export const postPhoneData = createAsyncThunk(
//   'postPhoneData',
//   async (phoneData) => {
//     const { data } = await axios.post('/phones', phoneData);
//     return data;
// });

const phoneNumbersSlice = createSlice({
  name: 'phoneNumbers',
  initialState: [],
  reducers: {
    addNumber: (state, { payload }) => {
      const { phone } = payload;
      const repeatedValue = state.find((item) => item.phone === phone);
      if (!repeatedValue) {
        state.push(payload);
      }
    },
  }
});

export const { addNumber } =  phoneNumbersSlice.actions;
export default phoneNumbersSlice.reducer;
