import DefaultLayout from "../layouts/adminLayout/DefaultLayout";
import { Dasboard } from "../pages/admin";
import { CreateCategory, ListCategory } from "../pages/admin/category";
import {
  ListAccount,
  CreateAccount,
  EditAccount,
  DetailAccount,
  InforAccount,
  Profile,
} from "../pages/admin/account";
import { FeedBack } from "../pages/admin/feedBack";
import {
  CreateProduct,
  CreateVariant,
  EditProduct,
  EditVariant,
  ListProduct,
  ListRating,
  ListVariant,
  TrashProducts,
  TrashVariants,
} from "../pages/admin/product";
import { DetailOrder, ListOrder, TrashOrders } from "../pages/admin/order";
import { ListStatistical, OrderStatistical } from "../pages/admin/statistical";
import { ListGroupRole, ListRole } from "../pages/admin/role";
import { CreateBrand, ListBrand } from "../pages/admin/brand";
import { ListDiscount } from "../pages/admin/discount";
import { ListColor } from "../pages/admin/color";
import { ListSize } from "../pages/admin/size";
import pathAdmin from "../utils/pathAdmin";

const adminRouter = [

  {
    //router dashboard
    path: pathAdmin.dashboard,
    component: Dasboard,
    layout: DefaultLayout,
  },
  {
    //router account
    path: pathAdmin.accounts,
    component: InforAccount,
    layout: DefaultLayout,
  },
  {
    //router groupRoles
    path: pathAdmin.accountGroupRoles,
    component: ListGroupRole,
    layout: DefaultLayout,
  },
  {
    //router roles
    path: pathAdmin.accountRoles,
    component: ListRole,
    layout: DefaultLayout,
  },
  // {
  //   //router edit roles
  //   path: pathAdmin.rolesEdit,
  //   component: ListRole,
  //   layout: DefaultLayout,
  // },
  {
    //router manager
    path: pathAdmin.accountManagers,
    component: ListAccount,
    layout: DefaultLayout,
  },
  {
    //router manager create
    path: pathAdmin.accountManagersCreate,
    component: CreateAccount,
    layout: DefaultLayout,
  },
  {
    //router user
    path: pathAdmin.accountUsers,
    component: ListAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.accountUserEdit,
    component: EditAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.accountManagerEdit,
    component: EditAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.accountManagerDetail,
    component: DetailAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.accountUserDetail,
    component: DetailAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.accountProfile,
    component: Profile,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.products,
    component: ListProduct,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productsTrash,
    component: TrashProducts,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productVariantsTrash,
    component: TrashVariants,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productVariants,
    component: ListVariant,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productVariantCreate,
    component: CreateVariant,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productVariantEdit,
    component: EditVariant,
    layout: DefaultLayout,
  },
  {
    //router rating comment 
    path: pathAdmin.variantComments,
    component: ListRating,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productsCreate,
    component: CreateProduct,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productsEdit,
    component: EditProduct,
    layout: DefaultLayout,
  },
  {
    //router categorys
    path: pathAdmin.categories,
    component: ListCategory,
    layout: DefaultLayout,
  },
  {
    //router categorys
    path: pathAdmin.categoryCreate,
    component: CreateCategory,
    layout: DefaultLayout,
  },
  {
    //router brands
    path: pathAdmin.brands,
    component: ListBrand,
    layout: DefaultLayout,
  },
  {
    //router brands
    path: pathAdmin.brandCreate,
    component: CreateBrand,
    layout: DefaultLayout,
  },
  {
    //router comments
    path: pathAdmin.feedback,
    component: FeedBack,
    layout: DefaultLayout,
  },
 
  {
    //router order
    path: pathAdmin.orders,
    component: ListOrder,
    layout: DefaultLayout,
  },
  {
    //router order
    path: pathAdmin.ordersTrash,
    component: TrashOrders,
    layout: DefaultLayout,
  },
  {
    //router order detail
    path: pathAdmin.ordersDetail,
    component: DetailOrder,
    layout: DefaultLayout,
  },
  {
    //router comments
    path: pathAdmin.statisticProduct,
    component: ListStatistical,
    layout: DefaultLayout,
  },
  {
    //router comments
    path: pathAdmin.statisticOrder,
    component: OrderStatistical,
    layout: DefaultLayout,
  },
  {
    //router Discount
    path: pathAdmin.discounts,
    component: ListDiscount,
    layout: DefaultLayout,
  },
  {
    //router Discount
    path: pathAdmin.colors,
    component: ListColor,
    layout: DefaultLayout,
  },
  {
    //router Discount
    path: pathAdmin.sizes,
    component: ListSize,
    layout: DefaultLayout,
  }
];

export default adminRouter;
