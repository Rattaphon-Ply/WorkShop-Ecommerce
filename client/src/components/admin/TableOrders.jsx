import { getOrdersAdmin, changeOrderStatus } from "@/api/admin"
import useEcomStore from "@/store/ecom-store"
import { useEffect, useState } from "react"
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
import { Dot } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify";
import { numberFormat, numberFormatAddTH } from "@/utils/number";
import { dateFormat } from "@/utils/dateformat";


const TableOrders = () => {
    const token = useEcomStore((state)=>state.token)
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;

    useEffect(()=>{
        handleGetOrder(token)
    },[])

    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const paginatedOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleGetOrder = ()=>{
        getOrdersAdmin(token)
        .then((res)=>{
            setOrders(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus)=>{
        console.log(orderId, orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
        .then((res)=>{
            console.log(res)
            toast.success('Update Status Success!!!')
            handleGetOrder(token)
        })
        .catch((err)=>{
            console.log(err)
        })
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

    const renderPageNumbers = () => {
        const pages = []
        
        // แสดงหน้าแรก
        if (currentPage > 3) {
            pages.push(
            <button key={1} onClick={() => setCurrentPage(1)} className="px-3 py-1 rounded bg-gray-100">
                1
            </button>
            )
            if (currentPage > 4) {
            pages.push(<span key="dots1" className="px-2">...</span>)
            }
        }

        // ปุ่มกลางๆ รอบ currentPage
        const start = Math.max(currentPage - 2, 1)
        const end = Math.min(currentPage + 2, totalPages)

        for (let i = start; i <= end; i++) {
            pages.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-3 py-1 rounded ${
                currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
            >
                {i}
            </button>
            )
        }

        // แสดงหน้าสุดท้าย
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
            pages.push(<span key="dots2" className="px-2">...</span>)
            }
            pages.push(
            <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 rounded bg-gray-100">
                {totalPages}
            </button>
            )
        }

        return pages
    }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
        <div>
            <Table className="table">
            <TableCaption>Order Management</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">No.</TableHead>
                    <TableHead className="text-left">ชื่อผู้ใช้งาน</TableHead>
                    <TableHead className="text-center">วันที่</TableHead>
                    <TableHead className="text-left">สินค้า</TableHead>
                    <TableHead className="text-right">รวม</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead className="text-center">จัดการ</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    paginatedOrders?.map((item, index)=>{
                        const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                        return (
                            <TableRow key={index}>
                                <TableHead scope="row" className="text-center">{rowNumber}</TableHead>
                                <TableCell className="text-left">
                                    <p>{item.orderedBy.email}</p>
                                    <p>{item.orderedBy.address}</p>
                                </TableCell>
                                <TableCell className="text-center">{dateFormat(item.createdAt)}</TableCell>
                                <TableCell className="text-left">
                                    <div className="max-h-[120px] overflow-y-auto space-y-1">
                                        {
                                            item.products?.map((product, index)=>
                                                <div key={index} className="flex my-1 space-x-3 items-center">
                                                    <Dot size={12} className="mt-1" />
                                                    <span className="m-0">{product.product.title}</span>
                                                    <span className="text-sm">{product.count} x {numberFormat(product.price)}</span>
                                                </div>
                                            )
                                        }
                                    </div> 
                                </TableCell>
                                <TableCell className="text-right">{numberFormatAddTH(item.cartTotal)}</TableCell>
                                <TableCell className="text-center">
                                    <span className={`${getStatusColor(item.orderStatus)} text-sm font-medium px-3 py-1 rounded-full`}>
                                        {item.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Select 
                                        value={item.orderStatus}
                                        onValueChange={(value)=>
                                            handleChangeOrderStatus(token, item.id, value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Not Process">Not Process</SelectItem>
                                            <SelectItem value="Processing">Processing</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Cancel Order">Cancel Order</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
                
            </TableBody>
                
            </Table>
            <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    </div>
  )
}
export default TableOrders