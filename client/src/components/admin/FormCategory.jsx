import { useState, useEffect } from "react"
import { createCategory, listCategory, removeCategory } from "@/api/Category"
import { Button } from "../ui/button"
import useEcomStore from "@/store/ecom-store"
import { toast } from "react-toastify"
import { Input } from "../ui/input"

const FormCategory = () => {
    const token = useEcomStore((state)=>state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)

    useEffect(()=>{
        getCategory()
    },[]) // [] กัน infinity loop

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!name){
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token,{name})
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory()
        }catch(err) {
            console.log(err)
        }
    }

    const handleRemove = async(id)=>{
        try {
            const res = await removeCategory(token, id)
            console.log(res)
            toast.success(`Delete ${res.data.name} success`)
            getCategory()
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold underline underline-offset-4">Category Management</h1>
            <form className="my-4" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="w-64">
                        <Input
                            placeholder="Add Category"
                            onChange={(e)=>setName(e.target.value)} 
                            type="text" 
                        />
                    </div>
                    <Button>Add Category</Button>
                </div>
            </form>

            <hr />

            <ul className="list-none">
                {
                    categories.map((item,index)=>
                        <li
                        className="flex justify-between my-2"
                        key={index}
                        >
                            <span>
                                {item.name}    
                            </span>
                            
                            <Button variant="destructive" onClick={()=>handleRemove(item.id)}>Delete</Button>
                        </li>
                    )
                }
            </ul>

        </div>
    )
}
export default FormCategory