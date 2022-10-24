import {BasicLayout, ClientLayout} from "../layouts"
import {
    SelectTable,
    Categories,
    Products,
    Cart,
    OrdersHistory
} from "../pages/client"
//import {Error404} from "../pages"

const routesCLient = [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exact: true
    },
    {
        path: "/client/:tableNumber",
        layout: ClientLayout,
        component: Categories,
        exact: true
    },
    {
        path: "/client/:tableNumber/cart",
        layout: ClientLayout,
        component: Cart,
        exact: true
    },
    {
        path: "/client/:tableNumber/orders",
        layout: ClientLayout,
        component: OrdersHistory,
        exact: true
    },
    {
        path: "/client/:tableNumber/:idCategory",
        layout: ClientLayout,
        component: Products,
        exact: true
    },
]

export default routesCLient;