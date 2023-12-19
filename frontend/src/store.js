import { configureStore } from "@reduxjs/toolkit";

import hospitalReducer from "./redux/hospitalSclice";

export const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
  },
});
