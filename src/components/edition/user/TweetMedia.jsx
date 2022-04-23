import React from "react";
import { ImageList, ImageListItem, CardMedia, Box } from "@mui/material";
import Image from "next/image";

export default function TweetMedia({ media }) {
  if (media.length === 1) {
    let urlType;
    if (media[0]?.type !== "photo") urlType = media[0]?.preview_image_url;
    else urlType = media[0]?.url;

    return (
      <CardMedia
        sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}
        component="img"
        src={urlType}
      />
    );
  } else {
    console.log(media);
    return (
      <Box>
        <ImageList
          variant="quilted"
          cols={2}
          sx={{ m: 0, height: 300, borderRadius: 2 }}
        >
          {media.map((element, index) => {
            let urlType;
            if (element.type !== "photo") urlType = element.preview_image_url;
            else urlType = element.url;

            let rows = 1;

            if (media.length === 3 && index === 1) {
              rows = 2;
            }

            return (
              <ImageListItem
                sx={{ position: "relative" }}
                rows={rows}
                key={element.media_key}
              >
                <Image
                  layout="fill"
                  height={element.height}
                  width={element.width}
                  alt="Twitter Photo"
                  src={`${urlType}`}
                  srcSet={`${urlType}`}
                  loading="lazy"
                  objectFit={"cover"}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    );
  }
}
