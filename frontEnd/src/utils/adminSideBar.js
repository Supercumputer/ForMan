import { pathAdmin } from "./path";

export const menu = [
  {
    // Dashboard
    path: pathAdmin.dashboard,
    icon: "fa-solid fa-chart-simple",
    title: "sidebar.dashboard",
    children: [],
  },
  {
    // Account
    path: pathAdmin.accounts,
    icon: "fa-solid fa-user",
    title: "sidebar.accounts",
    children: [
      { path: pathAdmin.managers, title: "sidebar.managers" },
      { path: pathAdmin.users, title: "sidebar.users" },
    ],
  },
  {
    // Product
    path: pathAdmin.products,
    icon: "fa-brands fa-product-hunt",
    title: "sidebar.products",
    children: [],
  },
  {
    // Orders
    path: pathAdmin.orders,
    icon: "fa-solid fa-clipboard",
    title: "sidebar.orders",
    children: [],
  },
  {
    // Category
    path: pathAdmin.category,
    icon: "fa-solid fa-layer-group",
    title: "sidebar.category",
    children: [],
  },
  {
    // Brand
    path: pathAdmin.brand,
    icon: "fa-brands fa-brave",
    title: "sidebar.brand",
    children: [],
  },
  {
    // Comments
    path: pathAdmin.comments,
    icon: "fa-solid fa-comments",
    title: "sidebar.comments",
    children: [],
  },
  {
    // Comments
    path: pathAdmin.discounts,
    icon: "fa-solid fa-ticket",
    title: "fields.discountCode",
    children: [],
  },
  {
    // Comments
    path: pathAdmin.messenger,
    icon: "fa-regular fa-snowflake",
    title: "sidebar.feedback",
    children: [],
  },
  {
    // Statistical
    path: pathAdmin.statistical,
    icon: "fa-solid fa-chart-pie",
    title: "sidebar.statistical",
    children: [
      { path: pathAdmin.statisticalInventory, title: "sidebar.inventory" },
      { path: pathAdmin.statisticalSelling, title: "sidebar.selling" },
    ],
  },
];
