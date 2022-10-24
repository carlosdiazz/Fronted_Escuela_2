import {AdminLayout} from "../layouts"
import {
    HomeAdmin,
    UsersAdmin
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

]


export default routesAdmin;