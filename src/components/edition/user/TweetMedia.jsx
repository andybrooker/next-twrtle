import React from 'react'
import { ImageList, ImageListItem, CardMedia } from '@mui/material'
import Image from 'next/image'

export default function TweetMedia({ media }) {

    if (media.length === 1) {

        let urlType
        if (media[0]?.type !== 'photo') urlType = media[0]?.preview_image_url;
        else urlType = media[0]?.url

        return (
            <CardMedia height="200" sx={{ borderBottom: 1, borderColor: 'divider' }} component="img" src={urlType} />
        )
    }

    else {
        return (
            <CardMedia sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <ImageList 
                variant="quilted"
                cols={2}
                sx={{ m: 0, height: 300 }}>
                    {media.map((element, index) => {

                        let urlType
                        if (element.type !== 'photo') urlType = element.preview_image_url;
                        else urlType = element.url

                        let rows = 1

                        if (media.length === 3 && index === 1) {
                            rows = 2
                        }

                        return (
                            <ImageListItem sx={{position: 'relative'}} rows={rows} key={element.media_key}>
                                <Image
                                    layout="fill"
                                    alt='Twitter Photo'
                                    src={`${urlType}`}
                                    srcSet={`${urlType}`}
                                    loading="lazy"
                                    objectFit={"cover"}
                                />
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </CardMedia>
        )
    }
}

