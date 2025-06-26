import MainNav from "@/components/MainNav"
import { Outlet } from "react-router-dom"

const LayoutUser = () => {
  return (
    <div>
        <MainNav />

        <main className="h-full px-4 mt-2">
          <Outlet />
        </main>
    </div>
  )
}
export default LayoutUser