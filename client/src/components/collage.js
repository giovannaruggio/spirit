import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function MasonryImageList() {
  return (
    <>
    <Box sx={{ width: "70%", overflowY: "scroll", marginTop: "160px"}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </>
  );
}

const itemData = [
  {
    img: "https://drive.google.com/uc?export=view&id=17gfmOjXERLsMCosedYzUbB_l9-2mPa3f",
    title: "Slice",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1wRz5lc0vcic_BR927nGzPZwIoLKDktoD",
    title: "Star",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1vucrcEaIxZ9kgU_JiyZnBN00EHaCY3CF",
    title: "Green Chair Orange",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1kY6kmy3CQP9q_1PFY1HdmxQ-QrjXejpY",
    title: "Flute",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1u5rK7T9X3_DBUcgEwSquowuBfWHSc3j2",
    title: "Green",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1ziTxe4KfxUoM2vcXdeJ1d53gxz0BAThn",
    title: "Martini",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=180BjAudTdVwNUE18z_Dfj86m2dxOWNCa",
    title: "Rosmary",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1Czbe4k1P-rOI0w5ljcIypH3Qg_SDhKy6",
    title: "Blueberry",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1HbhK7un949JLQahjlt4GQ7JwyxVzbsTZ",
    title: "Star star",
  },
  {
    img: "https://drive.google.com/uc?export=view&id=1iS2nm-2U_69HUPlE9pn2gDj3E27vDCgK",
    title: "Orange",
  },
];
