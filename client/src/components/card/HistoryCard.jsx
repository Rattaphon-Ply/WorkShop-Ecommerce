import { useEffect, useState } from "react"
import { getOrders } from "@/api/user"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useEcomStore from "@/store/ecom-store"
import { numberFormat, numberFormatAddTH } from "@/utils/number"
import { dateFormat } from "@/utils/dateformat"
import { motion } from "motion/react"

const dotVariants = {
  pulse: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}


const HistoryCard = () => {
    const token = useEcomStore((state)=>state.token)

    const [orders, setOrders]  = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        handleGetOrders(token)
    },[])

    const handleGetOrders = async()=>{
        await new Promise((resolve) => setTimeout(resolve, 800))
        getOrders(token)
        .then((res)=>{
            const sortedOrders = res.data.orders.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setOrders(sortedOrders)
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(() => setLoading(false))
    }

    const getStatusColor = (status)=>{
        switch (status) {
            case "Not Process":
                return 'bg-slate-200 text-slate-800 drop-shadow-slate-glow'
            case "Processing":
                return 'bg-blue-200 text-blue-800 drop-shadow-blue-glow'
            case "Completed":
                return 'bg-green-200 text-green-800 drop-shadow-green-glow'
            case "Cancel Order":
                return 'bg-red-200 text-red-800 drop-shadow-red-glow'
        }
    }
    

  return (
    <div className="space-y-4 mt-4">

            <h1 className="text-2xl font-bold text-white">ประวัติการสั่งซื้อ</h1>
        {/* คลุม */}
        <div className="space-y-4">
            {
                loading ? (
                    <div className="flex flex-row items-center justify-center min-h-screen gap-x-3">
                    {/* Spinner */}
                        <div className="flex items-center gap-3">
                            
                            <p className="text-2xl text-white">กำลังโหลด</p>
                        </div>

                        {/* Pulse Dots */}
                        <motion.div
                            animate="pulse"
                            transition={{ staggerChildren: 0.2 }}
                            className="flex gap-2"
                        >
                            <motion.div
                                className="w-4 h-4 rounded-full bg-blue-400"
                                variants={dotVariants}
                            />
                            <motion.div
                                className="w-4 h-4 rounded-full bg-blue-400"
                                variants={dotVariants}
                            />
                            <motion.div
                                className="w-4 h-4 rounded-full bg-blue-400"
                                variants={dotVariants}
                            />
                        </motion.div>
                    </div>
                ) : (
                    orders.length > 0 ? (
                    orders?.map((item, index)=>{
                        {/* Card Loop Order */}
                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.5,
                                    ease: [0, 0.71, 0.2, 1.01],
                                }}
                            >
                                <div key={index} className="bg-slate-100 p-4 rounded-md shadow-lg shadow-purple-500/50">
                                    {/* Header */}
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm">Order date</p>
                                            <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                                        </div>
                                        <div className="text-center">
                                            <span className={`${getStatusColor(item.orderStatus)} text-sm font-medium px-3 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Table Loop Product */}
                                    <div>
                                        <Table className="table">
                                            <TableHeader>
                                                <TableRow>
                                                <TableHead className="text-left">สินค้า</TableHead>
                                                <TableHead className="text-left">ราคา</TableHead>
                                                <TableHead className="text-left">จำนวน</TableHead>
                                                <TableHead className="text-left">รวม</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {
                                                    item.products?.map((product, index)=>{
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell className="text-left">{product.product.title}</TableCell>
                                                                <TableCell className="text-left">{numberFormat(product.product.price)}</TableCell>
                                                                <TableCell className="text-left">{product.count}</TableCell>
                                                                <TableCell className="text-left">{numberFormatAddTH(product.count * product.product.price)}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </div>
                                    {/* Total */}
                                    <div>
                                        <div className="text-right">
                                            <p>ราคาสุทธิ</p>
                                            <p>{numberFormatAddTH(item.cartTotal)}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })
                    ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <div>
                            <p className="text-center text-2xl text-white">ไม่มีประวัติการสั่งซื้อ</p>
                        </div>
                    </motion.div>
                    )
                )
            }
            {
                
            }
            
        </div>
    </div>
  )
}
export default HistoryCard