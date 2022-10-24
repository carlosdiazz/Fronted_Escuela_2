import routesAdmin from "./routes.admin";
//import routesCLient from "./routes.clients";
import {Error404} from "../pages"
import {BasicLayout} from "../layouts"

const routes = [
    ...routesAdmin,
    {
        path: "*",
        layout: BasicLayout,
        component: Error404,
    }
];

export default routes;