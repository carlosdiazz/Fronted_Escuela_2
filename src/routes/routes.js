import routesAdmin from "./routes.admin";
import {Error404} from "../pages"
import {AdminLayout} from "../layouts"

const routes = [
    ...routesAdmin,
    {
        path: "*",
        layout: AdminLayout,
        component: Error404,
    }
];

export default routes;