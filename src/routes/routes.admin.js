import {AdminLayout} from "../layouts"
import {
    HomeAdmin,
    UsersAdmin,
    ReportAdmin
    } from '../pages/admin'

const routesAdmin = [
    {
        path: "/",
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true
    },
    {
        path: "/users",
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true
    },
    {
        path: "/reportes",
        layout: AdminLayout,
        component: ReportAdmin,
        exact: true
    },

]


export default routesAdmin;