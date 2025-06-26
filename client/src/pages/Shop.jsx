import CartCard from "@/components/card/CartCard"
import ProductCard from "@/components/card/ProductCard"
import SearchCard from "@/components/card/SearchCard"
import useEcomStore from "@/store/ecom-store"
import { useEffect } from "react"

const Shop = () => {
  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)

  useEffect(()=>{
    getProduct()
  },[])

  return (
    <div className="flex">
      {/* SearcBar */}
      <div className="w-1/4 p-4 bg-slate-100 h-screen rounded-md">
        <SearchCard />
      </div>
      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {/* Product Card */}
          {
            products.map((item, index)=>
              <ProductCard key={index} item={item} />
            )
          }
        </div>
      </div>
      {/* Cart */}
      <div className="w-1/4 p-4 bg-slate-100 h-screen overflow-y-auto rounded-r-md">
        <CartCard />
      </div>
    </div>
  )
}
export default Shop