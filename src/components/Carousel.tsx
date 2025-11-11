"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Box, Card, CardMedia } from "@mui/material";

export default function Carousel({ images }: { images: string[] }) {
  const showPagination = images.length <= 6;

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        pagination={showPagination ? { clickable: true } : false}
        loop
        spaceBetween={10}
        style={{ paddingBottom: showPagination ? "30px" : "0px" }}
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
                alt={`slide-${img}`}
                sx={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {showPagination && (
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
      )}
    </Box>
  );
}
