import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Swiper.css';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Swipers() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://t4.ftcdn.net/jpg/02/73/55/33/360_F_273553300_sBBxIPpLSn5iC5vC8FwzFh6BJDKvUeaC.jpg"/></SwiperSlide>
        <SwiperSlide><img src="https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_scale,w_640/v1/media/gmg/M43WQHX7Y5DTRC6QSBOJA4X5VM?_a=DAJHqpE+ZAAA"/></SwiperSlide>
        <SwiperSlide><img src="https://cdn.culture.ru/images/eaec3f28-22d4-5d72-8635-b586e1f17754"/></SwiperSlide>
         <SwiperSlide><img src="https://static.sweetcare.pt/img/prd/488/v-638581039097692670/calvin-klein-021349ck-1.webp"/></SwiperSlide> 
        <SwiperSlide><img src="https://cdn.riah.ae/storage/upload/images/2024/12/03/674eb4ad16c16.jpg?w=700&h=700"  /></SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
