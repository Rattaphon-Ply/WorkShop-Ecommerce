import { useState, useEffect } from "react"
import useEcomStore from "@/store/ecom-store"
import { Button } from "../ui/button"
import { createProduct, readProduct, listProduct, updateProduct } from "@/api/product"
import { toast } from "react-toastify"
import UploadFile from "./UploadFile"
import { useParams, useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const initialstate = {
    "title": "Notebook",
    "description": "desc",
    "price": 29999,
    "quantity": 25,
    "categoryId": "",
    "images": []
}

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state)=>state.token)
    const getCategory = useEcomStore((state)=>state.getCategory)
    const categorise = useEcomStore((state)=>state.categories)
    

    const [form, setForm] = useState(initialstate)

    useEffect(()=>{
        getCategory()
        fetchProduct(token, id, form)
    },[])

    const fetchProduct = async(token, id, form)=>{
        try {
            const res = await readProduct(token, id, form)
            console.log('res from backend', res)
            setForm(res.data)
        }catch(err) {
            console.log('Err fetch data',err)
        }
    }

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
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
            navigate('/admin/product')
        }catch(err) {
            console.log(err)
        }
    }

    return (

        <div className="container mx-auto p-4 bg-white shadow-md">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold underline underline-offset-4">Edit Product</h1>
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
                    <Button variant="editBuy">แก้ไขสินค้า</Button>
                </div>

            </form>
        </div>
    )
}
export default FormEditProduct