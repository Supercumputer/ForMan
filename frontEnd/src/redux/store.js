import { configureStore } from "@reduxjs/toolkit";

import dark from "./darkMode";
import auth from "./auth";
import filter from "./filter";
import cart from "./cart";
import statistical from "./statistical";

const store = configureStore({
  reducer: {
    darkMode: dark,
    auth: auth,
    filter: filter,
    cart: cart,
    statistical: statistical,
  },
});

export default store;
