"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Box, Card, CardMedia } from "@mui/material";

const images = [
  "/images/exampleImgCarousel.png",
  "/images/exampleImgCarousel.png",
  "/images/exampleImgCarousel.png",
  "/images/exampleImgCarousel.png",
];

export default function Carousel() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 350,
        margin: "22px auto",
        position: "relative",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={10}
        style={{ paddingBottom: "30px" }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 2,
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`slide-${i}`}
                sx={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 0;
          transform: translateY(10px);
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #bbb;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: var(--azul-primario);
        }
      `}</style>
    </Box>
  );
}
