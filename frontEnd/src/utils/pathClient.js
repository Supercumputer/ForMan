const BASE_CLIENT = "/";

// Đường dẫn chung
const pathClient = {
  // Trang chính
  home: BASE_CLIENT,

  // Đăng nhập và đăng ký
  login: `${BASE_CLIENT}login`,
  register: `${BASE_CLIENT}register`,
  authSuccess: `${BASE_CLIENT}auth-success`,

  // Quản lý đơn hàng
  orderLookUp: `${BASE_CLIENT}orderlookup`,
  
  // Sản phẩm
  productCollection: `${BASE_CLIENT}collections/:slug`,
  productDetail: `${BASE_CLIENT}products/:slug`,

  // Giỏ hàng và thanh toán
  checkout: `${BASE_CLIENT}checkouts`,
  inventory: `${BASE_CLIENT}checkouts/stock_problems`,
  cart: `${BASE_CLIENT}carts`,
  
  // Tài khoản và tìm kiếm
  account: `${BASE_CLIENT}account`,
  search: `${BASE_CLIENT}search`,

  // Các trang thông báo và lỗi
  thanks: `${BASE_CLIENT}thanks`,
  pageNotFound: "*"
};

export default pathClient;