import { useEffect, useState } from "react"
import { Button } from "../ui/button" 
import { listUserCart, saveAddress } from "@/api/user"
import useEcomStore from "@/store/ecom-store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { numberFormat, numberFormatAddTH } from "@/utils/number"

const SummaryCard = () => {
    const token = useEcomStore((state)=>state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        handleGetUserCart(token)
    },[])

    const handleGetUserCart = (token)=>{
        listUserCart(token)
        .then((res)=>{
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleSaveAddress = ()=>{
        console.log(address)
        if(!address){
            return toast.warning("Please fill address")
        }
        saveAddress(token, address)
        .then((res)=>{
            console.log(res)
            toast.success(res.data.message)
            setAddressSaved(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleGoToPayment = ()=>{
        if(!addressSaved){
            return toast.warning('กรุณากรอกที่อยู่')
        }
        navigate('/user/payment')
    }


  return (
    <div className="mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">

            {/* Left */}
            <div className="w-2/4">
                <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-3">
                    <h1 className="text-lg font-bold">ที่อยู่ในกาารจัดส่ง</h1>
                    <textarea
                        required
                        onChange={(e)=>setAddress(e.target.value)} 
                        placeholder="กรุณากรอกที่อยู่" 
                        className="w-full px-2"
                    >
                    </textarea>
                    <Button onClick={handleSaveAddress} variant="editBuy" >Save Address</Button>
                </div>
            </div>

            {/* Right */}
            <div className="w-2/4">
                <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
                    <h1 className="text-lg font-bold">Summary</h1>

                    {/* Item List */}
                    {
                        products?.map((item, index)=>
                            <div key={index}>
                                <div className="flex justify-between items-end">
                                    {/* Left */}
                                    <div>
                                        <p className="font-bold">{item.product.title}</p>
                                        <p className="text-sm">จำนวน: {item.count} x {numberFormat(item.product.price)}</p>
                                    </div>

                                    {/* Right */}
                                    <div>
                                        <p className="text-red-500 font-bold">{numberFormatAddTH(item.count * item.product.price)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    

                    <div>
                        <div className="flex justify-between">
                            <p>ค่าจัดส่ง:</p>
                            <p>0.00</p>
                        </div>

                        <div className="flex justify-between">
                            <p>ส่วนลด:</p>
                            <p>0.00</p>
                        </div>
                    </div>

                    <div>
                        <hr />
                        <div className="flex justify-between">
                            <p className="font-bold">ยอดรวมสุทธิ:</p>
                            <p className="text-red-500 font-bold text-lg">{numberFormatAddTH(cartTotal)}</p>
                        </div>
                    </div>

                    <div>
                        <Button
                            onClick={handleGoToPayment}
                            // disabled={!addressSaved}
                            className="w-full"
                        >
                                ดำเนินการชำระเงิน
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}
export default SummaryCard