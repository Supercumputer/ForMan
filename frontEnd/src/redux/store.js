import { configureStore } from "@reduxjs/toolkit";

import dark from "./darkMode";
import auth from "./auth";
import filter from "./filter";
import cart from "./cart";

const store = configureStore({
  reducer: {
    darkMode: dark,
    auth: auth,
    filter: filter,
    cart: cart,
  },
});

export default store;
