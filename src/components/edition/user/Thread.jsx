import React, { useState } from 'react';
import { TweetContent } from '../../Tweet';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import ButtonUnstyled, {buttonUnstyledClasses} from '@mui/base/ButtonUnstyled'

export default function Thread({ data, includes }) {

    const [open, setOpen] = useState(false)

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
            <CustomButton role='button' tabIndex={0} onClick={handleOpen} onKeyPress={handleKeypress}>
                <TweetContent data={data[0]} includes={includes} />
            </CustomButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='xl'
                scroll='paper'
            >
                <DialogTitle sx={{m: 2, backgroundColor: 'none', mb: 0}} >Thread by {getAuthorName(data[0], includes)}</DialogTitle>
                <DialogContent>{data.map((tweet, index) => <Box key={index} sx={{py: 2, px: 2}}><TweetContent data={tweet} includes={includes}/></Box>)}</DialogContent>
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

