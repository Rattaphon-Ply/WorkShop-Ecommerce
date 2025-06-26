    import { useState, useEffect } from "react"
    import useEcomStore from "@/store/ecom-store"
    import { Button } from "../ui/button"
    import { createProduct, deleteProduct } from "@/api/product"
    import { toast } from "react-toastify"
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
    import UploadFile from "./UploadFile"
    import { Link } from "react-router-dom"
    import { Pencil, Trash2 } from 'lucide-react';
    import { numberFormat } from "@/utils/number"
    import { dateFormat } from "@/utils/dateformat"
    import { Input } from "../ui/input"
import { Label } from "../ui/label"

    const initialstate = {
        "title": "",
        "description": "",
        "price": 0,
        "quantity": 0,
        "categoryId": "",
        "images": []
    }

    const FormProduct = () => {
        const token = useEcomStore((state)=>state.token)
        const getCategory = useEcomStore((state)=>state.getCategory)
        const categorise = useEcomStore((state)=>state.categories)
        const getProduct = useEcomStore((state)=>state.getProduct)
        const products = useEcomStore((state)=>state.products)

        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 20;

        const totalPages = Math.ceil(products.length / itemsPerPage);
        const paginatedProducts = products.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
        

        const [form, setForm] = useState({
            "title": "",
            "description": "",
            "price": 0,
            "quantity": 0,
            "categoryId": "",
            "images": []
        })

        useEffect(()=>{
            getCategory()
            getProduct(100)
        },[])

        const handleOnChange = (e) => {
            console.log(e.target.name, e.target.value)
            setForm({
                ...form,
                [e.target.name]: e.target.value

            })
        }

        const handleSubmit = async(e) => {
            e.preventDefault() // กันรีเฟรช
            try {
                const res = await createProduct(token, form)
                console.log(res)
                setForm(initialstate)
                getProduct(100)
                toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
            }catch(err) {
                console.log(err)
            }
        }

        const handleDelete = async (id) =>{
            if(window.confirm('จะลบจริงๆ ใช่ไหม?')){
                try {
                    const res = await deleteProduct(token, id)
                    console.log(res)
                    toast.success(`Deleted Finished`)
                    getProduct(100)
                }catch(err) {
                    console.log('ERR delete',err)
                }
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
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold underline underline-offset-4">Category Management</h1>
                    <div className="flex gap-4 p-4">
                        <div className="">
                            <Label>Title</Label>
                            <Input 
                                className="w-[240px]"
                                value={form.title}
                                onChange={handleOnChange}
                                placeholder="Title"
                                name="title"
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                className="w-[300px]"
                                value={form.description}
                                onChange={handleOnChange}
                                placeholder="Description"
                                name="description"
                            />
                        </div>

                        <div>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                className="w-[120px] text-right"
                                value={form.price}
                                onChange={handleOnChange}
                                name="price"
                            />
                        </div>

                        <div>
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                className="w-[120px] text-right"
                                value={form.quantity}
                                onChange={handleOnChange}
                                placeholder="Quantity"
                                name="quantity"
                            />
                        </div>

                        <div className="w-[200px]">
                            <Label>Category</Label>
                            <Select
                                value={form.categoryId}
                                onValueChange={(value)=> setForm({ ...form, categoryId: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Please Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categorise.map((item, index)=>
                                            <SelectItem key={index} value={String(item.id)}>{item.name}</SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Upload file */}
                    <div className="p-4">
                        <Label>Add Images</Label>
                        <UploadFile form={form} setForm={setForm} />
                        <Button>เพิ่มสินค้า</Button>
                    </div>


                    <hr />
                    <Table className="table">
                    <TableCaption>A list of your recent products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center">No.</TableHead>
                            <TableHead className="text-center">รูปภาพ</TableHead>
                            <TableHead className="text-left">ชื่อสินค้า</TableHead>
                            <TableHead className="text-left">รายละเอียด</TableHead>
                            <TableHead className="text-right">ราคา</TableHead>
                            <TableHead className="text-right">จำนวน</TableHead>
                            <TableHead className="text-right">จำนวนที่ขายได้</TableHead>
                            <TableHead className="text-center">วันที่อัพเดต</TableHead>
                            <TableHead className="text-center">จัดการ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProducts.map((item, index) => {
                            const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                            return (
                                <TableRow key={index}>
                                    <TableHead scope="row" className="text-center">{rowNumber}</TableHead>
                                    <TableCell className="text-center">
                                        {
                                            item.images.length > 0
                                            ? <img className="w-24 h-24 rounded-lg shadow-md" src={item.images[0].url} />
                                            : <div className="w-24 h-24 bg-slate-200 rounded-md flex items-center justify-center shadow-md">No image</div>
                                        }
                                    </TableCell>
                                    <TableCell className="text-left">{item.title}</TableCell>
                                    <TableCell className="text-left">{item.description}</TableCell>
                                    <TableCell className="text-right">{numberFormat(item.price)}</TableCell>
                                    <TableCell className="text-right">{numberFormat(item.quantity)}</TableCell>
                                    <TableCell className="text-right">{item.sold}</TableCell>
                                    <TableCell className="text-center">{dateFormat(item.updatedAt)}</TableCell>
                                    <TableCell className="text-center align-middle">
                                        <div className="inline-flex justify-center items-center gap-2">
                                            <Link to={'/admin/product/'+item.id} className="hover:-translate-y-1 hover:duration-200">
                                                <Pencil />
                                            </Link>
                                            <Button
                                                type="button"
                                                className="h-8 w-8 hover:scale-105 hover:-translate-y-1 transition hover:duration-200"
                                                variant="destructive"
                                                onClick={()=>handleDelete(item.id)}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
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

                </form>
            </div>
        )
    }
    export default FormProduct