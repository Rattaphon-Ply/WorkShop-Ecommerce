import BestSeller from "@/components/home/BestSeller"
import ContentCarousel from "@/components/home/ContentCarousel"
import NewProduct from "@/components/home/NewProduct"

const Home = () => {
  return (
    <div>
      <ContentCarousel />

      <p className="text-2xl text-center my-4 text-white">สินค้าขายดี</p>
      <BestSeller />

      <p className="text-2xl text-center my-4 text-white">สินค้าใหม่</p>
      <NewProduct />
    </div>
  )
}
export default Home