import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import img1 from '../assets/trattamenti/close-up-shot-of-glo.jpg';
import img2 from '../assets/trattamenti/the-procedure-of-myo.jpg';
import img3 from '../assets/trattamenti/confident-woman-atte.jpg';
import img4 from '../assets/trattamenti/doctor-placing-elect.jpg';
import img5 from '../assets/trattamenti/close-up-of-five-met.jpg';



function SwiperImage() {
  return (
    <div className='grid grid-cols-6 mb-36 px-0 sm:px-10 xl:px-40'>
        <div className='col-span-6' >
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            slidesPerView={1}
            spaceBetween={70}
            coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 200,
            modifier: 1,
            }}
            breakpoints={{
              1024: {
                slidesPerView: 2.25,
                spaceBetween: 50,
              },
            }}
            modules={[EffectCoverflow, Autoplay]}
            speed={1500}
            className="mySwiper"
            >
                <SwiperSlide>
                <img src={img1} />
                </SwiperSlide>
                <SwiperSlide>
                <img src={img2} />
                </SwiperSlide>
                <SwiperSlide>
                <img src={img3} />
                </SwiperSlide>
                <SwiperSlide>
                <img src={img4} />
                </SwiperSlide>
                <SwiperSlide>
                <img src={img5} />
                </SwiperSlide>
            </Swiper>
        </div>
      </div>
  );
}

export default SwiperImage;
