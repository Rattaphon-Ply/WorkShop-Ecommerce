import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import useEcomStore from '@/store/ecom-store';
import { numberFormat } from '@/utils/number';
import { motion } from "motion/react"


const ProductCard = ({item}) => {
    const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div className="border rounded-md shadow-md p-2 w-48 text-white">
            <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                
            >
            <div>
                {
                    item.images && item.images.length > 0
                    ? <img src={item.images[0].url} className='rounded-md w-full h-[160px] object-cover' />
                    : <div className="w-full h-[160px] bg-gray-200 text-black rounded-md text-center flex items-center justify-center shadow">
                        No Image
                    </div>
                }
            </div>
            </motion.div>
            <div className="py-2">   
                <p className="text-xl truncate">{item.title}</p>
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-sm font-bold'>{numberFormat(item.price)}</span>
                <Button onClick={()=>actionAddtoCart(item)} variant="ghost"><ShoppingCart className='!w-6 !h-6' /></Button>
            </div>
        </div>
    </motion.div>
  )
}
export default ProductCard