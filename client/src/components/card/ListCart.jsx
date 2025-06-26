import useEcomStore from '@/store/ecom-store';
import { ListCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '@/api/user';
import { toast } from 'react-toastify';
import { numberFormat, numberFormatAddTH } from '@/utils/number';

const ListCart = () => {
    const cart = useEcomStore((state)=>state.carts)
    const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)
    const user = useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)

    const navigate = useNavigate()

    const handleSaveCart = async()=>{
        await createUserCart(token, { cart })
        .then((res)=>{
            console.log(res)
            toast.success('บันทึกใส่ตะกล้าเรียบร้อย')
            navigate('/checkout')
        })
        .catch((err)=>{
            console.log(err)
            const data = err.response?.data;

            if (Array.isArray(data?.messages)) {
                // ถ้า backend ส่ง messages หลายรายการ
                data.messages.forEach((msg) => toast.warning(msg));
            } else if (data?.message) {
                // ถ้าเป็นข้อความเดี่ยว
                toast.warning(data.message);
            } else {
                // fallback message
                toast.error('เกิดข้อผิดพลาดขณะบันทึกตะกร้า');
            }
        })
    }

  return (
    <div className="bg-gray-200 rounded-sm p-4">
        {/* Header */}
        <div className='flex gap-4 mb-4'>
            <ListCheck size={36} />
            <p className='text-2xl font-bold'>รายการสินค้า {cart.length} รายการ</p>
        </div>
        {/* List */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Left */}
            <div className='md:col-span-2'>
                {
                    cart.map((item,index)=>
                        <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
                            <div className="flex justify-between mb-2">
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
                                        <p className="text-sm">{numberFormat(item.price)} x {item.count}</p>
                                    </div>
                                </div>
                                {/* Price */}
                                <div className='flex items-center'>
                                    {numberFormatAddTH(item.price * item.count)}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* Right */}
            <div className='bg-white p-4 rounded-md shadow-md space-y-4 md:self-start'>
                <p className='text-2xl font-bold'>ยอดรวม</p>
                <div className='flex justify-between'>
                    <span>รวมสุทธิ</span>
                    <span className='text-2xl'>
                        {numberFormatAddTH(getTotalPrice())}
                    </span>
                </div>
                <div className='flex flex-col gap-2'>

                    {
                        user
                        ? 
                        <Link>
                            <Button
                                disabled={cart.length < 1}
                                onClick={handleSaveCart} 
                                className='w-full' 
                                variant='destructive'
                            >
                                สั่งซื้อ
                            </Button>
                        </Link>
                        : 
                        <Link to={'/login'}>
                            <Button className='w-full'>Login</Button>
                        </Link>
                    }
                    


                    <Link to={'/shop'}>
                        <Button className='w-full' variant='outline'>แก้ไขรายการ</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default ListCart