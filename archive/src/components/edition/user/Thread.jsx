import React, { useState } from "react";
import { TweetContent } from "../../Tweet";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

export default function Thread({ data, includes }) {
  const [open, setOpen] = useState(false);

  const mobile = useMediaQuery("(max-width: 600px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleOpen();
    }
  };

  const getAuthorName = (tweet, includes) => {
    const [author] = includes?.users.filter(
      (user) => user.id == tweet.author_id
    );
    return author.name;
  };

  return (
    <React.Fragment>
      <CustomButton
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyPress={handleKeypress}
      >
        <Typography sx={{ color: "text.secondary" }} variant="micro">
          Thread – {data.length} Tweets
        </Typography>
        <TweetContent data={data[0]} includes={includes} />
        <Box
          sx={{
            pt: 2,
            maskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        >
          <TweetContent data={data[1]} includes={includes} />
        </Box>
      </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen
        maxWidth="xl"
        scroll="body"
      >
        <Fab
          disableRipple
          onClick={handleClose}
          sx={{
            border: "1px solid",
            backgroundColor: "background.paper",
            borderColor: "divider",
            boxShadow: 2,
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 999,
          }}
          size="small"
        >
          <CloseIcon />
        </Fab>
        <DialogTitle
          sx={{
            mx: mobile ? 0 : "auto",
            width: mobile ? "100%" : "760px",
            px: 5,
            mt: 2,
            backgroundColor: "none",
            mb: 0,
          }}
        >
          Thread by {getAuthorName(data[0], includes)}
        </DialogTitle>
        <DialogContent
          sx={{ mx: mobile ? 0 : "auto", width: mobile ? "100%" : "760px" }}
        >
          {data.map((tweet, index) => (
            <Box
              key={index}
              sx={{
                py: 2,
                px: 2,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: "0px",
                  width: "10%",
                  left: "45%",
                  height: "1px",
                  borderBottom: "1px solid",
                  borderBottomColor: "divider",
                },
              }}
            >
              <TweetContent data={tweet} includes={includes} />
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const CustomButton = styled("div")(({ theme }) => ({
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  transition: "all 150ms ease",
  outline: 0,
  cursor: "pointer",
  "&:hover,&:focus": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
}));

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
