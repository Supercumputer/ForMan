import { configureStore } from "@reduxjs/toolkit";

import dark from "./darkMode";
import auth from "./auth";

const store = configureStore({
  reducer: {
    darkMode: dark,
    auth: auth,
  },
});

export default store;
