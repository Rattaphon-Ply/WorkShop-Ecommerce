import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import zxcvbn from "zxcvbn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react"

const registerSchema = z.object({
  email: z.string().email({message: 'Invalid Email!!!'}),
  password: z.string().min(8, {message: 'Password must be more than 8 characters.'}),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message:"Password doesn't match",
    path:['confirmPassword'],
})

const register = () => {
  // Javascript ส่วนของฟังค์ชั่น
  const [loading, setLoading] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)
  
  const navigate = useNavigate()

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({ 
    resolver: zodResolver(registerSchema)
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


  const onSubmit = async(data)=>{
    // Send to Back || ส่งไปหลังบ้าน
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5001/api/register',data)
      
      toast.success(res.data)
      await new Promise((resolve) => setTimeout(resolve, 800))
      navigate('/')
    }catch(err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
        return <LoadingScreen />
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
            Register
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input {...register("email")} 
                  placeholder="Email"
                  className={`${errors.email && 'border-red-500'}`}
                />
                {errors.email && 
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                }
              </div>
              
              <div>
                <Label>Password</Label>
                <Input {...register("password")} 
                  placeholder="Password"
                  className={`${errors.password && 'border-red-500'}`}
                  type="password"
                />
                {errors.password && 
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                }
              </div>
              
              <div>
                <Label>Confirm Password</Label>
                <Input {...register("confirmPassword")} 
                  placeholder="Confirm Password"
                  className={`${errors.confirmPassword && 'border-red-500'}`}
                  type="password"
                />
                {errors.confirmPassword && 
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                }
              </div>

              <Button className="w-full">Register</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
export default register