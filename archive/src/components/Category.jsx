import React, { useState } from "react";
import {
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import useCategories from "../hooks/useCategories";
import useAuthorsFromCategory from "../hooks/useAuthorsFromCategory";
import NextLinkComposed from "../components/NextLinkComposed";
import AuthorDescription from "./AuthorDescription";

export default function CategoryMap() {
  const [category, setCategory] = useState("Featured");
  const mobile = useMediaQuery("(max-width: 700px)");

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategories();

  const {
    data: authorsData,
    isLoading: areAuthorsLoading,
    isError: areAuthorsError,
  } = useAuthorsFromCategory(category);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: mobile ? "column" : "row-reverse",
        alignItems: "flex-start",
        gap: mobile ? 1 : 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          pt: 2,
          flexWrap: "wrap",
          alignItems: "flex-start",
          maxWidth: mobile ? "inherit" : "200px",
        }}
      >
        {categoryData?.map((value, index) => (
          <Category
            key={index}
            category={value.category}
            setCategory={setCategory}
            selected={value.category === category}
          />
        ))}
      </Box>
      <Box sx={{ width: "100%" }}>
        <FullAuthorsList loading={areAuthorsLoading} authors={authorsData} />
      </Box>
    </Box>
  );
}

export const FullAuthorsList = ({ loading, authors }) => {
  const mobile = useMediaQuery("(max-width: 700px)");

  return (
    <List sx={{ pt: 1, mx: -2 }}>
      {loading
        ? [0, 1, 2].map((value, index) => <SkeletonListItem key={index} />)
        : authors?.map((author, index) => (
            <AuthorsPageLink author={author} key={index} />
          ))}
    </List>
  );
};

function Category({ category, selected, setCategory }) {
  return (
    <Button
      sx={{ opacity: selected ? 1 : 0.5, fontWeight: 500 }}
      onClick={() => setCategory(category)}
      variant="outlined"
      color="secondary"
    >
      {category}
    </Button>
  );
}

const AuthorsPageLink = ({ author }) => {
  return (
    <ListItem
      key={author.id}
      disablePadding
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:last-child": {
          borderBottom: "none",
          a: { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 },
        },
        "&:first-child": {
          a: { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
        },
      }}
    >
      <ListItemButton
        sx={{ py: 2 }}
        to={{ pathname: `/edition/${author?.username}` }}
        component={NextLinkComposed}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Avatar
              alt={author?.name}
              src={author?.profile_image_url.replace("_normal", "")}
            ></Avatar>
          </Box>
          <Box>
            <Typography fontWeight={500} sx={{ color: "text.primary" }}>
              {author?.name}
            </Typography>
            <AuthorDescription
              authorQuery={{
                data: author,
                isLoading: false,
                isError: false,
              }}
            />
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

const SkeletonListItem = ({}) => {
  return (
    <ListItem
      disablePadding
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Box sx={{ py: 2, flexGrow: 1, px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Skeleton
              animation="wave"
              width={40}
              height={40}
              variant="circular"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ color: "text.primary" }}>
              <Skeleton animation="wave" width={100} variant="text" />
            </Typography>
            <Typography sx={{ width: "100%" }}>
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
            </Typography>
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};
