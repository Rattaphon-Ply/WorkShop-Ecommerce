import { currentUser } from "@/api/auth"
import useEcomStore from "@/store/ecom-store"
import { useEffect, useState } from "react"
import LoadingToRedirect from "./LoadingToRedirect"

const ProtectRouteUser = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useEcomStore((state)=> state.user)
    const token = useEcomStore((state)=> state.token)
    
    useEffect(()=>{
        if(user && token){
            // send to back
            currentUser(token)
            .then((res)=>setOk(true))
            .catch((res)=>setOk(false))
        }
    },[]) // [] กันลูปอินฟินิตี้

    return ok ? element: <LoadingToRedirect />

  return (
    element
  )
}
export default ProtectRouteUser