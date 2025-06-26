import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import useEcomStore from '@/store/ecom-store';
import { Link } from 'react-router-dom';
import { numberFormat, numberFormatAddTH } from '@/utils/number';
import { motion } from "motion/react"

const CartCard = () => {
    const carts = useEcomStore((state)=>state.carts)
    const actionUpdateQuantity = useEcomStore((state)=>state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state)=>state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)

  return (
    <div>
        <h1 className="text-2xl font-bold">ตะกล้าสินค้า</h1>
        {/* Border */}
        <div className="border p-2">
            {/* Card */}
            {
                carts.map((item,index)=>
                    
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }}
                    >
                        <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
                            {/* Row 1 */}
                            <div className="flex justify-between mb-2">
                                {/* Left */}
                                <div className="flex gap-2 items-center">
                                    {
                                        // วงเล็บก็แค่เอาไว้ครอบหรือคลุมเงื่อนไขเท่านั้น
                                        item.images && item.images.length > 0 
                                        ? ( //ถ้ามีรูป แสดงรูป
                                        <img className='w-16 h-16 rounded-md' src={item.images[0].url} />
                                    
                                        ) : ( // ถ้าไม่มี แสดง No Image
                                        <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                                            No Image
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p className="text-sm">{item.description}</p>
                                        <p className='text-sm'>ราคา: {numberFormat(item.price)}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div  className="text-red-600 p-2">
                                    <Trash2 onClick={()=>actionRemoveProduct(item.id)} className='cursor-pointer' />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex justify-between">
                                {/* Left */}
                                <div className="border rounded-sm px-2 py-1 flex items-center">
                                    <button onClick={()=>actionUpdateQuantity(item.id, item.count - 1)} className="px-2 py-1 bg-slate-300 rounded-sm hover:bg-slate-500"><Minus size={16} /></button>
                                    <span className="px-4 ">{item.count}</span>
                                    <button onClick={()=>actionUpdateQuantity(item.id, item.count + 1)} className="px-2 py-1 bg-slate-300 rounded-sm hover:bg-slate-500"><Plus size={16} /></button>
                                </div>
                                {/* Right */}
                                <div className="font-bold text-blue-500 flex items-center">
                                    {numberFormat(item.price * item.count)}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            }
            {/* Total */}
            <div className='flex justify-between px-2'>
                <span>รวม:</span>
                <span>
                    {numberFormatAddTH(getTotalPrice())}
                </span>
            </div>
            {/* Button */}
            <Link to='/cart'>
                <Button variant="payment" className="w-full">ดำเนินการชำระเงิน</Button>
            </Link>
        </div>
    </div>
  )
}
export default CartCard