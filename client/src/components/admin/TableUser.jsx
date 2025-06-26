import { getListAllUser, changeUserStatus, changeUserRole } from "@/api/admin"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { dateFormat } from "@/utils/dateformat"
import { toast } from "react-toastify"

const TableUser = () => {
    const token = useEcomStore((state)=>state.token)

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;

    useEffect(()=>{
        handleGetUser(token)
    },[])

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginatedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleGetUser = (token)=>{
        getListAllUser(token)
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleChangeUserStatus = (userId, userStatus)=>{
        console.log(userId,userStatus)
        const value = {
            id: userId,
            enabled: userStatus
        }
        changeUserStatus(token, value)
        .then((res)=>{
            console.log(res.data)
            handleGetUser(token)
            toast.success('Update Status Success!!!')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleChangeUserRole = (userId, userRole)=>{
        console.log(userId,userRole)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
        .then((res)=>{
            console.log(res.data)
            handleGetUser(token)
            toast.success('Update Role Success!!!')
        })
        .catch((err)=>{
            console.log(err)
        })
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
            <TableCaption>User Management</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">No.</TableHead>
                    <TableHead className="text-left">Email</TableHead>
                    <TableHead className="text-center">วันที่แก้ไขล่าสุด</TableHead>
                    <TableHead className="text-center w-[150px]">สิทธิ์</TableHead>
                    <TableHead className="text-center w-[150px]">สถานะ</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    paginatedUsers?.map((item, index)=>{
                        const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                        return (
                            <TableRow key={index}>
                                <TableHead scope="row" className="text-center">{rowNumber}</TableHead>
                                <TableCell className="text-left">{item.email}</TableCell>
                                <TableCell className="text-center">{dateFormat(item.updatedAt)}</TableCell>
                                <TableCell className="text-center">
                                    <Select 
                                        value={item.role}
                                        onValueChange={(value)=>
                                            handleChangeUserRole(item.id, value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Select 
                                        value={String(item.enabled)}
                                        onValueChange={(value)=>
                                            handleChangeUserStatus(item.id, value === "true")}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Active</SelectItem>
                                            <SelectItem value="false">Disable</SelectItem>
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

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

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
export default TableUser