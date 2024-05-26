import adminRoutes from "./adminRouter";
import clientRoutes from "./clientRouter";

const arrRoutes = [...adminRoutes, ...clientRoutes];

export default arrRoutes;
