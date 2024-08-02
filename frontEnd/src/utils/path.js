
const ADMIN = "/admin";
const ACCOUNT = "/accounts";
const PRODUCT = "/products";
const ORDERS = "/orders";
const CATEGORY = "/category";
const COMMENTS = "/comments";
const STATISTICAL = "/statistical";
const BRAND = "/brand";
const DISCOUNTS = "/discounts";
const COLORS = "/colors";
const SIZES = "/sizes";

const pathAdmin = {

  // Bảng điều khiển
  dashboard: `${ADMIN}/dashboard`,

  // Quản lý tài khoản
  accounts: `${ADMIN}${ACCOUNT}`,
  profile: `${ADMIN}${ACCOUNT}/profile`,
  managers: `${ADMIN}${ACCOUNT}/managers`,
  managersCreate: `${ADMIN}${ACCOUNT}/managers/create`,
  managerEdit: `${ADMIN}${ACCOUNT}/managers/edit/:id`,
  managerDetail: `${ADMIN}${ACCOUNT}/managers/detail/:id`,
  users: `${ADMIN}${ACCOUNT}/users`,
  usersEdit: `${ADMIN}${ACCOUNT}/users/edit/:id`,
  usersDetail: `${ADMIN}${ACCOUNT}/users/detail/:id`,
  groupRoles: `${ADMIN}${ACCOUNT}/grouproles`,
  roles: `${ADMIN}${ACCOUNT}/roles`,
  rolesEdit: `${ADMIN}${ACCOUNT}/roles/:id/edit`,

  // Quản lý sản phẩm
  products: `${ADMIN}${PRODUCT}`,
  productsCreate: `${ADMIN}${PRODUCT}/create`,
  productsEdit: `${ADMIN}${PRODUCT}/:id/edit`,
  productsTrash: `${ADMIN}${PRODUCT}/trash`,
  ptoductsVariantTrash: `${ADMIN}${PRODUCT}/:id/variants/trash`,
  productsVariant: `${ADMIN}${PRODUCT}/:id/variants`,
  productsVariantcreate: `${ADMIN}${PRODUCT}/:id/variants/create`,
  productsVariantEdit: `${ADMIN}${PRODUCT}/variants/:id/edit`,

  variantComment: `${ADMIN}/${PRODUCT}/:id/variants/:idc/comments`,

  // Quản lý đơn hàng
  orders: `${ADMIN}${ORDERS}`,
  ordersTrash: `${ADMIN}${ORDERS}/trash`,
  ordersDetail: `${ADMIN}${ORDERS}/detail/:id`,

  // Quản lý danh mục
  category: `${ADMIN}${CATEGORY}`,
  categoryCreate: `${ADMIN}${CATEGORY}/create`,

  // Quản lý danh mục
  brand: `${ADMIN}${BRAND}`,
  brandCreate: `${ADMIN}${BRAND}/create`,

  // Quản lý bình luận
  comments: `${ADMIN}${COMMENTS}`,
  commentsDetail: `${ADMIN}${COMMENTS}/detail/:id`,

  // Mã giảm giá
  discounts: `${ADMIN}${DISCOUNTS}`,

  // Thống kê
  statisticProduct: `${ADMIN}${STATISTICAL}${PRODUCT}`,
  statisticOrder:  `${ADMIN}${STATISTICAL}${ORDERS}`,

  // color
  colors: `${ADMIN}${COLORS}`,
  sizes: `${ADMIN}${SIZES}`,
};

const CLIENT = "/";

const pathClient = {
  client: CLIENT,
  login: `/login`,
  authSuccess: `/auth-success`,
  orderLookUp: `/orderlookup`,
  register: `/register`,
  product: `/collections/:slug`,
  productDetail: `/products/:slug`,
  checkout: `/checkouts`,
  inventory: `/checkouts/stock_problems`,
  account: `/account`,
  search: `/search`,
  cart: `/carts`,
  thanks: `/thanks`,
  pageNotFound: "*"
}

export { pathAdmin, pathClient };
