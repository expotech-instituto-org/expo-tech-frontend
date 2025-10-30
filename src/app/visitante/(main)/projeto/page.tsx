"use client";
import { MembersComponent } from "@/components/Members";
import { SwipeableDrawerComponent } from "@/components/SwipeableDrawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Avatar, IconButton } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState } from "react";
export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [isReavaliating, setIsReavaliating] = useState(false);

  return (
    <div className="h-[120vh]">
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => history.back()}>
            <ArrowBackIosIcon className="text-[var(--azul-primario)]" />
          </IconButton>
          <h1 className="text-[var(--azul-primario)] font-bold text-[1.5rem]">
            Nome do projeto
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Rating
            className="[&.MuiRating-iconFilled]:text-[var(--error)] [&_.MuiRating-icon]:!text-[var(--error)]"
            name="customized-color"
            max={1}
            defaultValue={0}
            getLabelText={(value: number) =>
              `${value} Heart${value !== 1 ? "s" : ""}`
            }
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
          <Avatar sx={{ width: 24, height: 24 }} />
        </div>
      </div>
      <p className="text-[var(--text)] text-[.9rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        assumenda, quod labore, tempora, nisi nostrum laboriosam possimus
        corrupti necessitatibus provident nobis? In aperiam sequi laborum magni
        esse, fugit eius nobis!
      </p>
      <h2 className="text-[var(--azul-primario)] font-medium text-center text-2xl">
        Integrantes
      </h2>
      <MembersComponent
        Class="1° Ano F"
        Members={[
          {
            name: "Stephany Andreina",
            photo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8",
          },
          {
            name: "Stephany Andreina",
            photo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8",
          },
          {
            name: "Stephany Andreina",
            photo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8",
          },
          {
            name: "Stephany Andreina",
            photo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8",
          },
          {
            name: "Stephany Andreina",
            photo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8",
          },
          {
            name: "Stephany Andreina",
            photo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8",
          },
        ]}
      />
      {!openModal && (
        <div className="bg-[var(--azul-primario)] fixed bottom-0 w-full right-0 h-[9%] flex items-center justify-center z-[9999]">
          <IconButton
            className="!text-center !font-bold !text-3xl !text-white"
            onClick={() => setOpenModal(true)}
          >
            {isReavaliating ? "Reavaliar" : "Avaliar"}
            <KeyboardArrowUpIcon className="!text-3xl" />
          </IconButton>
        </div>
      )}
      {openModal && (
        <SwipeableDrawerComponent
          title={isReavaliating ? "Reavaliar" : "Avaliar"}
          subtitle="Com base no que você viu do projeto, avaliar:"
          question={[
            {
              description: "Como foi a organização do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Como foi a ideia do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Como foi a apresentação do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Como foi a execução do grupo?",
              responseType: "Rating",
              isRequired: true,
            },
            {
              description: "Deixe um comentário para o grupo",
              responseType: "Comment",
              isRequired: false,
            },
          ]}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </div>
  );
}
