import React, { useState } from 'react';
import { TweetContent } from '../../Tweet';
import { Box, Dialog, DialogContent, DialogTitle, Fab, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';


export default function Thread({ data, includes }) {

    const [open, setOpen] = useState(false)

    const mobile = useMediaQuery('(max-width: 600px)')

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleKeypress = e => {
      if (e.key === 'Enter') {
        handleOpen();
      }
    };

    const getAuthorName = (tweet, includes) => {
        const [author] = includes?.users.filter((user) => user.id == tweet.author_id)
        return author.name
    }

    return (
        <React.Fragment>
            <CustomButton sx={{mb: 1}} role='button' tabIndex={0} onClick={handleOpen} onKeyPress={handleKeypress}>
                <TweetContent data={data[0]} includes={includes} />
            </CustomButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                fullScreen
                maxWidth='xl'
                scroll='body'
                
            >
                <Fab disableRipple onClick={handleClose} sx={{border: '1px solid', backgroundColor: "background.paper", borderColor: "divider", boxShadow: 2, position: 'fixed', top: 16, right: 16, zIndex: 999}} size="small">
                    <CloseIcon />
                </Fab>
                <DialogTitle sx={{mx: mobile ? 0 : 'auto', width: mobile ? '100%' : '760px', px: 5, mt: 2, backgroundColor: 'none', mb: 0}} >Thread by {getAuthorName(data[0], includes)}</DialogTitle>
                <DialogContent sx={{mx: mobile ? 0 : 'auto', width: mobile ? '100%' : '760px'}}>{data.map((tweet, index) => <Box key={index} sx={{py: 1, px: 2}}><TweetContent data={tweet} includes={includes}/></Box>)}</DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

const CustomButton = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '10px',
    border: '1px solid',
    borderColor: theme.palette.divider,
    transition: 'all 150ms ease',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: theme.shadows[2]
    }
  }))


//   padding: 16px;
//   border-radius: 8px;
//   transition: all 150ms ease;
//   cursor: pointer;
//   border: 1px;
//   border-color: theme.palette.border

//   &:hover {
//     background-color: blue;
//   }

//   &.${buttonUnstyledClasses.active} {
//     background-color: blue;
//   }

//   &.${buttonUnstyledClasses.focusVisible} {
//     box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
//     outline: none;
//   }

//   &.${buttonUnstyledClasses.disabled} {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// function CustomButton(props) {
//   return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
// }

