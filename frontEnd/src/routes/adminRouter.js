import DefaultLayout from "../layouts/layoutAdmin/DefaultLayout";
import { Dasboard } from "../pages/admin";
import { pathAdmin } from "../utils/path";

const adminRouter = [
  {
    path: pathAdmin.dashboard,
    component: Dasboard,
    layout: DefaultLayout,
  },
];
export default adminRouter;
