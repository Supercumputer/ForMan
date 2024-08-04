import DefaultLayout from "../layouts/layoutAdmin/DefaultLayout";
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
import { pathAdmin } from "../utils/path";
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
    path: pathAdmin.groupRoles,
    component: ListGroupRole,
    layout: DefaultLayout,
  },
  {
    //router roles
    path: pathAdmin.roles,
    component: ListRole,
    layout: DefaultLayout,
  },
  {
    //router edit roles
    path: pathAdmin.rolesEdit,
    component: ListRole,
    layout: DefaultLayout,
  },
  {
    //router manager
    path: pathAdmin.managers,
    component: ListAccount,
    layout: DefaultLayout,
  },
  {
    //router manager create
    path: pathAdmin.managersCreate,
    component: CreateAccount,
    layout: DefaultLayout,
  },
  {
    //router user
    path: pathAdmin.users,
    component: ListAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.usersEdit,
    component: EditAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.managerEdit,
    component: EditAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.managerDetail,
    component: DetailAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.usersDetail,
    component: DetailAccount,
    layout: DefaultLayout,
  },
  {
    //router user edit
    path: pathAdmin.profile,
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
    path: pathAdmin.ptoductsVariantTrash,
    component: TrashVariants,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productsVariant,
    component: ListVariant,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productsVariantcreate,
    component: CreateVariant,
    layout: DefaultLayout,
  },
  {
    //router product
    path: pathAdmin.productsVariantEdit,
    component: EditVariant,
    layout: DefaultLayout,
  },
  {
    //router rating comment 
    path: pathAdmin.variantComment,
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
    path: pathAdmin.category,
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
    path: pathAdmin.brand,
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
    path: pathAdmin.feedBack,
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
