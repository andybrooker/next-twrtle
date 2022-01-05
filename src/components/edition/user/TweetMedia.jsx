import React from 'react'
import { ImageList, ImageListItem, CardMedia } from '@mui/material'

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
                <ImageList sx={{ m: 0, height: 200 }}>
                    {media.map((element) => {

                        let urlType
                        if (element.type !== 'photo') urlType = element.preview_image_url;
                        else urlType = element.url

                        return (
                            <ImageListItem key={element.media_key}>
                                <img
                                    src={`${urlType}`}
                                    srcSet={`${urlType}`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </CardMedia>
        )
    }
}

