
const ADMIN = "/admin";
const ACCOUNT = "/accounts";
const PRODUCT = "/products";
const ORDERS = "/orders";
const CATEGORY = "/category";
const COMMENTS = "/comments";
const STATISTICAL = "/statistical";
const MESSENGER = "/messenger";
const BRAND = "/brand";
const DISCOUNTS = "/discounts";

const pathAdmin = {
  // Đăng nhập và xác thực
  login: `${ADMIN}/login`,

  // Bảng điều khiển
  dashboard: `${ADMIN}/dashboard`,

  // Quản lý tài khoản
  accounts: `${ADMIN}${ACCOUNT}`,
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
  
  productsVariant: `${ADMIN}${PRODUCT}/:id/variants`,
  productsVariantcreate: `${ADMIN}${PRODUCT}/:id/variants/create`,
  productsVariantEdit: `${ADMIN}${PRODUCT}/variants/:id/edit`,

  variantComment: `${ADMIN}/${PRODUCT}/:id/variants/:idc/comments`,
 
  // Quản lý đơn hàng
  orders: `${ADMIN}${ORDERS}`,
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
  statistical: `${ADMIN}${STATISTICAL}`,
  statisticalInventory: `${ADMIN}${STATISTICAL}/inventory`,
  statisticalSelling: `${ADMIN}${STATISTICAL}/selling`,

  // Tin nhắn
  messenger: `${ADMIN}${MESSENGER}`,
};

const CLIENT = "/";

const pathClient = {
  client: CLIENT,
  product: `/collections`,
  // productDetail: `/slugCate/:slugPro`,
  productDetail: `/detail`,
  checkout: `/checkout`,
  account: `/account`,
  search: `/search`,

}

export { pathAdmin, pathClient };
