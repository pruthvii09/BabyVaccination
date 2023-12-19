import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hospital: localStorage.getItem("hospital")
    ? JSON.parse(localStorage.getItem("hospital"))
    : null,
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    setHospital: (state, action) => {
      state.hospital = action.payload;
    },
    logoutHospital: (state, action) => {
      state.hospital = null;
    },
  },
});
export const { setHospital, logoutHospital } = hospitalSlice.actions;

export default hospitalSlice.reducer;
