import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import History from "../pages/user/History"
import Checkout from "../pages/Checkout"
import Cart from "../pages/Cart"
import Login from "../pages/auth/login"
import Register from "../pages/auth/register"
import Layout from "../layout/Layout"
import LayoutAdmin from "../layout/LayoutAdmin"
import Dashboard from "../pages/admin/Dashboard"
import Category from "../pages/admin/Category"
import Product from "../pages/admin/Product"
import Manage from "../pages/admin/Manage"
import LayoutUser from "../layout/LayoutUser"
import HomeUser from "../pages/user/HomeUser"
import ProtectRouteUser from "./ProtectRouteUser"
import ProtectRouteAdmin from "./ProtectRouteAdmin"
import EditProduct from "@/pages/admin/EditProduct"
import Payment from "@/pages/user/Payment"
import ManageOrders from "@/pages/admin/ManageOrders"


const router = createBrowserRouter([
    { 
        path:'/', 
        element:<Layout />,
        children: [
            { index:true, element:<Home /> },
            { path:'shop', element:<Shop /> },
            { path:'cart', element:<Cart     /> },
            { path:'checkout', element:<Checkout /> },
            { path:'login', element:<Login /> },
            { path:'register', element:<Register /> },
        ] 
    },

    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index:true, element:<Dashboard /> },
            { path:'category', element:<Category /> },
            { path:'product', element:<Product /> },
            { path:'product/:id', element:<EditProduct /> },
            { path:'manage', element:<Manage /> },
            { path:'orders', element:<ManageOrders /> },
        ]
    },

    {
        path: '/user',
        // element: <LayoutUser />,
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index:true, element:<HomeUser /> },
            { path:'payment', element:<Payment /> },
            { path:'history', element:<History /> },
        ]
    }
    

])

const AppRoutes = () => {
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}
export default AppRoutes