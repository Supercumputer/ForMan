import DefaultLayout from "../layouts/layoutClient/DefaultLayout";
import {
  Account,
  Checkout,
  Home,
  Product,
  ProductDetail,
  Search,
} from "../pages/client";
import { pathClient } from "../utils/path";

const clientRouter = [
  {
    //router home
    path: pathClient.client,
    component: Home,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.product,
    component: Product,
    layout: DefaultLayout,
  },

  {
    //router home
    path: pathClient.productDetail,
    component: ProductDetail,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.checkout,
    component: Checkout,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.account,
    component: Account,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.search,
    component: Search,
    layout: DefaultLayout,
  },
];

export default clientRouter;
