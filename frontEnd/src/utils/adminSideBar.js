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
    // Product
    path: pathAdmin.colors,
    icon: "fa-solid fa-droplet",
    title: "sidebar.colors",
    children: [],
  },
  {
    // Product
    path: pathAdmin.sizes,
    icon: "fa-solid fa-wand-magic-sparkles",
    title: "sidebar.sizes",
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
    path: pathAdmin.feedBack,
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
    // Statistical
    path: pathAdmin.statisticProduct,
    icon: "fa-solid fa-chart-pie",
    title: "sidebar.statistical",
    children: [
      { path: pathAdmin.statisticProduct, title: "sidebar.products" },
      { path: pathAdmin.statisticOrder, title: "sidebar.orders" },
    ],
  },
];
