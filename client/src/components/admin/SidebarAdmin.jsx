import { NavLink } from "react-router-dom"
import { LayoutDashboard, UserRoundCog, Layers2, ShoppingBasket, LogOut, ListOrdered } from 'lucide-react';
import useEcomStore from "@/store/ecom-store";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen";
import { useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
    const navigate = useNavigate()

    const logout = useEcomStore((state)=>state.logout)

    const [loading, setLoading] = useState(false)

    const handleLogout = async() => {
        setLoading(true)      
        try {
            await logout()
            await new Promise((resolve) => setTimeout(resolve, 800))
            navigate('/')       
        } catch (err) {
            console.error('Logout failed', err)
        } finally {
            setLoading(false)
        }
    }



  return (
    <div className="bg-slate-600 w-64 text-gray-100 flex flex-col h-screen">

        {loading && <LoadingScreen />}
        
        <div className="h-24 bg-slate-700 flex items-center justify-center text-center text-2xl font-bold">
            Admin panel
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
            <NavLink
                to={'/admin'}
                end
                className={({isActive})=>
                isActive
                ? 'bg-slate-700 rounded-md text-white px-4 py-4 flex items-center' // <-ถ้าจริงทำตามเงื่อนไข
                : 'text-slate-200 px-4 py-2 hover:bg-slate-500 hover:text-white rounded flex items-center' // <-ถ้าเท็จทำตามเงื่อนไข
            }>
                <LayoutDashboard className="mr-2" />
                Dashboard
            </NavLink>

            <NavLink
                to={'manage'}
                className={({isActive})=>
                isActive
                ? 'bg-slate-700 rounded-md text-white px-4 py-4 flex items-center' // <-ถ้าจริงทำตามเงื่อนไข
                : 'text-slate-200 px-4 py-2 hover:bg-slate-500 hover:text-white rounded flex items-center' // <-ถ้าเท็จทำตามเงื่อนไข
            }>
                <UserRoundCog className="mr-2" />
                Manage
            </NavLink>

            <NavLink
                to={'category'}
                className={({isActive})=>
                isActive
                ? 'bg-slate-700 rounded-md text-white px-4 py-4 flex items-center' // <-ถ้าจริงทำตามเงื่อนไข
                : 'text-slate-200 px-4 py-2 hover:bg-slate-500 hover:text-white rounded flex items-center' // <-ถ้าเท็จทำตามเงื่อนไข
            }>
                <Layers2 className="mr-2" />
                Category
            </NavLink>

            <NavLink
                to={'product'}
                className={({isActive})=>
                isActive
                ? 'bg-slate-700 rounded-md text-white px-4 py-4 flex items-center' // <-ถ้าจริงทำตามเงื่อนไข
                : 'text-slate-200 px-4 py-2 hover:bg-slate-500 hover:text-white rounded flex items-center' // <-ถ้าเท็จทำตามเงื่อนไข
            }>
                <ShoppingBasket className="mr-2" />
                Product
            </NavLink>

            <NavLink
                to={'orders'}
                className={({isActive})=>
                isActive
                ? 'bg-slate-700 rounded-md text-white px-4 py-4 flex items-center' // <-ถ้าจริงทำตามเงื่อนไข
                : 'text-slate-200 px-4 py-2 hover:bg-slate-500 hover:text-white rounded flex items-center' // <-ถ้าเท็จทำตามเงื่อนไข
            }>
                <ListOrdered className="mr-2" />
                Orders
            </NavLink>
        </nav>

        <div className="">
            <button onClick={handleLogout} className="bg-slate-700 h-16 w-full font-bold text-center hover:bg-slate-800 duration-200">
                Logout
            </button>
        </div>
    </div>
  )
}
export default SidebarAdmin