import DefaultLayout from "../layouts/layoutClient/DefaultLayout";
import Home from "../pages/client/Home";
import { pathClient } from "../utils/path";

const clientRouter = [
    {
        //router home
        path: pathClient.client,
        component: Home,
        layout: DefaultLayout,
      },
];

export default clientRouter;
