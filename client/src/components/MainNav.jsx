import useEcomStore from "@/store/ecom-store"
import { Link, NavLink } from "react-router-dom"
import Badge from '@mui/material/Badge';
import { ShoppingBasket, ChevronDown } from 'lucide-react';
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";


const MainNav = () => {
    const navigate = useNavigate()

    const carts = useEcomStore((state)=>state.carts)
    const user = useEcomStore((state)=>state.user)
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
    <nav className="shadow-md bg-gradient-to-r from-blue-500 to-purple-500">

        {loading && <LoadingScreen />}
        
        <div className="mx-auto px-4">
            <div className="flex justify-between h-16">
                <div className="flex items-center gap-6">

                    <Link to={'/'} className="text-2xl font-bold">LOGO</Link>

                    <NavLink 
                        className={({isActive})=>
                            isActive
                            ? 'px-3 py-2 bg-white text-blue-700 text-sm font-medium  rounded-md'
                            : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition duration-300'
                        }
                        to={'/'}
                    >
                        Home
                    </NavLink>

                    <NavLink 
                        className={({isActive})=>
                            isActive
                            ? 'px-3 py-2 bg-white text-blue-700 text-sm font-medium rounded-md'
                            : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition duration-300'
                        }
                        to={'/shop'}
                    >
                        Shop
                    </NavLink>

                    {/* Badge */}
                    <NavLink 
                        className={({isActive})=>
                            isActive
                            ? 'px-3 py-2 bg-white text-blue-700 text-sm font-medium rounded-md'
                            : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition duration-300'
                        }
                            to={'/cart'}
                        >
                        <Badge badgeContent={carts.length} color="secondary">
                            <ShoppingBasket />
                        </Badge>
                    </NavLink>
                </div>
                
                {
                    user
                    ?   <div className="flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex gap-2 items-center">
                                    <img 
                                        className="w-8 h-8"
                                        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-hacker-avatars-flat-icons-pack-people-456327.png?f=webp&w=512"
                                    />
                                    <ChevronDown />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator /> {/* ขีดเส้น */}

                                    <DropdownMenuItem asChild>
                                        <Link to="/user/history">History</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={handleLogout}>
                                        Logout
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    :   <div className="flex items-center gap-4">
                            <NavLink 
                                className={({isActive})=>
                                    isActive
                                    ? 'px-3 py-2 bg-white text-blue-700 text-sm font-medium hover:bg-gray-100 rounded-md'
                                    : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition duration-300'
                                } 
                                to={'/register'}
                            >
                                Register
                            </NavLink>

                            <NavLink 
                                className={({isActive})=>
                                    isActive
                                    ? 'px-3 py-2 bg-white text-blue-700 text-sm font-medium hover:bg-gray-100 rounded-md'
                                    : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition duration-300'
                                }
                                to={'/login'}
                            >
                                Login
                            </NavLink>
                        </div>
                }
                

                
            </div>

        </div>
    </nav>
  )
}
export default MainNav