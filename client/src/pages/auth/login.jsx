import { Button } from "@/components/ui/button"
import useEcomStore from "@/store/Ecom-Store";
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react"

const login = () => {
  // Javascript ส่วนของฟังค์ชั่น
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state)=>state.actionLogin)



  const [form, setForm] = useState({
    email:"",
    password:"",
  })

  useEffect(()=>{
    document.body.style.background = "linear-gradient(#2A00B7, #42006C)";
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  },[])

  const handleOnChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault() //ป้องงงกันการรีเฟรช

    // Send to Back || ส่งไปหลังบ้าน
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Welcome Back!!!')
    } catch(err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }

    // ด้านล่างแบบเก่า ธรรมดา
    // try {
    //   const res = await axios.post('http://localhost:5001/api/login',form)
    //   toast.success(res.data)
    // }catch(err) {
    //   const errMsg = err.response?.data?.message
    //   toast.error(errMsg)
    //   console.log(err)
    // }
  }

  const roleRedirect = (role) => {
    if(role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="w-full bg-white p-8 max-w-md shadow-md rounded-lg">
          <h1 className="text-2xl text-[#3c009d] text-center my-4 font-bold underline underline-offset-4">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input 
                  placeholder="Email"
                  onChange={handleOnChange}
                  name='email'
                  type="email" 
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input 
                  placeholder="Password"
                  onChange={handleOnChange}
                  name='password'
                  type="password" 
                />
              </div>

              <Button className="w-full">Login</Button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  )
}
export default login