import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';


// import required modules
import { Autoplay, Thumbs, FreeMode } from 'swiper/modules';

const SwiperShowProduct = ({children}) => {
  return (
    <div>
        <Swiper
            spaceBetween={10}
            slidesPerView={4}
            loop={true}
            freeMode={true}
            watchSlidesProgress={true}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                400: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                1280: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                },
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[ Autoplay, FreeMode, Thumbs]}
            className="mySwiper object-cover rounded-md"
        >
            {children}
        </Swiper>
    </div>
  )
}
export default SwiperShowProduct