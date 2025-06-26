import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperStyles.css'

// import required modules
import { Autoplay, Navigation, Thumbs, FreeMode } from 'swiper/modules';

const ContentCarousel = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [data, setData] = useState([])

    useEffect(()=>{
        handleGetImage()
    },[])

    const handleGetImage = async()=>{
        await axios.get('https://picsum.photos/v2/list?page=1&limit=10')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div>
        <Swiper
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }}
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[ Autoplay, Navigation, FreeMode, Thumbs]}
            className="mySwiper2 h-80 rounded-md mb-6"
        >
            {
                data?.map((item,index)=>
                    <SwiperSlide>
                        <img src={item.download_url} />
                    </SwiperSlide>
                )
            }
        </Swiper>

        <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[ Navigation, FreeMode, Thumbs]}
            className="mySwiper-Main object-cover rounded-md"
        >
            {
                data?.map((item,index)=>
                    <SwiperSlide key={index}>
                        <img src={item.download_url} className='rounded-md' />
                    </SwiperSlide>
                )
            }
        </Swiper>
    </div>
  )
}
export default ContentCarousel