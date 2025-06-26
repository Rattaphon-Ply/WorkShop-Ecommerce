import useEcomStore from "@/store/ecom-store"
import { useEffect, useState } from "react"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from "@/utils/number";

const SearchCard = () => {
    const getProduct = useEcomStore((state)=>state.getProduct)
    const products = useEcomStore((state)=>state.products)
    const actionSearchFilters = useEcomStore((state)=>state.actionSearchFilters)

    const getCategory = useEcomStore((state)=>state.getCategory)
    const categories = useEcomStore((state)=>state.categories)
    
    const [text, setText] = useState('')
    const [categorySelected, setcategorySelected] = useState([])
    const [price, setPrice] = useState([1000, 30000])

    const [filters, setFilters] = useState({
        query: '',
        category: [],
        price: [1000, 30000],
    });

    const formatTHB = (value)=> numberFormat(value);

    useEffect(()=>{
        getCategory()
    },[])
    
    // Step 1 Search By Text
    useEffect(()=>{
        const delay = setTimeout(()=>{
            setFilters((prev) => ({ ...prev, query: text }));
        }, 300)

        return ()=> clearTimeout(delay)
    },[text])
    // Step 2 Search By category
    const handleCheck = (e) => {
        const value = e.target.value;
        const updated = [...categorySelected];
        const index = updated.indexOf(value);

        if (index === -1) updated.push(value);
        else updated.splice(index, 1);

        setcategorySelected(updated);
        setFilters((prev) => ({ ...prev, category: updated }));
    }
    
    // Step 3 Search By Price
    const handlePrice = (value) =>{
        setPrice(value)
        setFilters((prev) => ({...prev, price: value}));
    }
    
    // Step 4 เรียกสินค้าตาม filter (query, category, price)
    useEffect(() => {
        const isEmpty = 
            !filters.query && 
            filters.category.length === 0 &&
            filters.price[0] === 1000 &&
            filters.price[1] === 30000; // default

        if (isEmpty) {
            getProduct();
        } else {
            actionSearchFilters(filters);
        }
    }, [filters]);
  return (
    <div>
        <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
        {/* Search By Text */}
        <input
            onChange={(e)=>setText(e.target.value)}
            className="border rounded-md w-full mb-4 px-2"
            type="text"
            placeholder="ค้นหาสินค้า...."
        />
        <hr />
        {/* Search By category */}
        <div>
            <h1>หมวดหมู่สินค้า</h1>
            <div>
                {
                    categories.map((item, index)=>
                        <div key={index}>
                            <input 
                                
                                onChange={handleCheck}
                                value={item.id}
                                type="checkbox"
                            />
                            <label>{item.name}</label>
                        </div>
                    )
                }
            </div>
        </div>
        <hr />
        {/* Search By Price */}
        <div>
            <h1>ค้นหาราคา</h1>
            <div>
                <div className="flex justify-between">
                    <span>Min : {formatTHB(price[0])}</span>
                    <span>Max : {formatTHB(price[1])}</span>
                </div>
                <Slider 
                    onChange={handlePrice}
                    range
                    min={0}
                    max={100000}
                    value={price}
                />
            </div>
        </div>
    </div>
  )
}
export default SearchCard