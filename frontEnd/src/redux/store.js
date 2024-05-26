import { configureStore } from "@reduxjs/toolkit";

import dark from "./darkMode";

const store = configureStore({
  reducer: {
    dark,
  },
});

export default store;
