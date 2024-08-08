import { AuthSuccess } from "../components/client";
import { PageNotFound } from "../components/common";
import DefaultLayout from "../layouts/clientLayout/DefaultLayout";
import {
  Account,
  Cart,
  Checkout,
  Home,
  Inventory,
  Login,
  OrderLookup,
  Product,
  ProductDetail,
  Register,
  Search,
  Thanks,
} from "../pages/client";
import pathClient from "../utils/pathClient";

export const publicClientRouter = [
  {
    //router login
    path: pathClient.login,
    component: Login,
  },
  {
    //router login
    path: pathClient.pageNotFound,
    component: PageNotFound,
  },
  {
    //router login
    path: pathClient.authSuccess,
    component: AuthSuccess,
  },
  {
    //router Register
    path: pathClient.register,
    component: Register,
  },
  {
    //router home
    path: pathClient.home,
    component: Home,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.productCollection,
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
    path: pathClient.search,
    component: Search,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.cart,
    component: Cart,
    layout: DefaultLayout,
  },
  {
    //router home
    path: pathClient.thanks,
    component: Thanks,
  },
  {
    //router home
    path: pathClient.inventory,
    component: Inventory,
  },
  {
    //router home
    path: pathClient.orderLookUp,
    component: OrderLookup,
    layout: DefaultLayout,
  },
];

export const privateClientRouter = [
  {
    path: pathClient.account,
    component: Account,
    layout: DefaultLayout,
  },
];
