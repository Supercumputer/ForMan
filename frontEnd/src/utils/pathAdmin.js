const BASE_ADMIN = "/admin";

// Quản lý tài khoản
const ACCOUNT = "/accounts";
const ACCOUNT_PROFILE = `${BASE_ADMIN}${ACCOUNT}/profile`;
const ACCOUNT_MANAGERS = `${BASE_ADMIN}${ACCOUNT}/managers`;
const ACCOUNT_USERS = `${BASE_ADMIN}${ACCOUNT}/users`;
const ACCOUNT_GROUP_ROLES = `${BASE_ADMIN}${ACCOUNT}/grouproles`;
const ACCOUNT_ROLES = `${BASE_ADMIN}${ACCOUNT}/roles`;

// Quản lý sản phẩm
const PRODUCT = "/products";
const PRODUCT_BASE = `${BASE_ADMIN}${PRODUCT}`;
const PRODUCT_VARIANTS = `${PRODUCT_BASE}/:id/variants`;
const PRODUCT_VARIANT_CREATE = `${PRODUCT_BASE}/:id/variants/create`;

// Quản lý đơn hàng
const ORDERS = "/orders";
const ORDERS_BASE = `${BASE_ADMIN}${ORDERS}`;

// Quản lý danh mục
const CATEGORY = "/categories";
const CATEGORY_BASE = `${BASE_ADMIN}${CATEGORY}`;

// Quản lý thương hiệu
const BRAND = "/brands";
const BRAND_BASE = `${BASE_ADMIN}${BRAND}`;

// Quản lý bình luận
const FEEDBACK = "/feedback";
const FEEDBACK_BASE = `${BASE_ADMIN}${FEEDBACK}`;

// Mã giảm giá
const DISCOUNTS = "/discounts";
const DISCOUNTS_BASE = `${BASE_ADMIN}${DISCOUNTS}`;

// Thống kê
const STATISTICAL = "/statistical";
const STATISTICAL_BASE = `${BASE_ADMIN}${STATISTICAL}`;

// Các đường dẫn
const pathAdmin = {
  // Bảng điều khiển
  dashboard: `${BASE_ADMIN}/dashboard`,

  // Quản lý tài khoản
  accounts: `${BASE_ADMIN}${ACCOUNT}`,
  accountProfile: ACCOUNT_PROFILE,
  accountManagers: ACCOUNT_MANAGERS,
  accountManagersCreate: `${ACCOUNT_MANAGERS}/create`,
  accountManagerEdit: `${ACCOUNT_MANAGERS}/edit/:id`,
  accountManagerDetail: `${ACCOUNT_MANAGERS}/detail/:id`,
  accountUsers: ACCOUNT_USERS,
  accountUserEdit: `${ACCOUNT_USERS}/edit/:id`,
  accountUserDetail: `${ACCOUNT_USERS}/detail/:id`,
  accountGroupRoles: ACCOUNT_GROUP_ROLES,
  accountRoles: ACCOUNT_ROLES,
  accountRoleEdit: `${ACCOUNT_ROLES}/:id/edit`,

  // Quản lý sản phẩm
  products: PRODUCT_BASE,
  productsCreate: `${PRODUCT_BASE}/create`,
  productsEdit: `${PRODUCT_BASE}/:id/edit`,
  productsTrash: `${PRODUCT_BASE}/trash`,
  productVariants: PRODUCT_VARIANTS,
  productVariantsTrash: `${PRODUCT_VARIANTS}/trash`,
  productVariantCreate: PRODUCT_VARIANT_CREATE,
  productVariantEdit: `${PRODUCT_VARIANTS}/:id/edit`,
  variantComments: `${PRODUCT_VARIANTS}/:idc/comments`,

  // Quản lý đơn hàng
  orders: ORDERS_BASE,
  ordersTrash: `${ORDERS_BASE}/trash`,
  ordersDetail: `${ORDERS_BASE}/detail/:id`,

  // Quản lý danh mục
  categories: CATEGORY_BASE,
  categoryCreate: `${CATEGORY_BASE}/create`,

  // Quản lý thương hiệu
  brands: BRAND_BASE,
  brandCreate: `${BRAND_BASE}/create`,

  // Quản lý bình luận
  feedback: FEEDBACK_BASE,
  
  // Mã giảm giá
  discounts: DISCOUNTS_BASE,

  // Thống kê
  statisticProduct: `${STATISTICAL_BASE}${PRODUCT}`,
  statisticOrder: `${STATISTICAL_BASE}${ORDERS}`,

  // Màu sắc và kích thước
  colors: `${BASE_ADMIN}/colors`,
  sizes: `${BASE_ADMIN}/sizes`,
};

export default pathAdmin