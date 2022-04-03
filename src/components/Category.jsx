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
      <List sx={{ pt: 0 }}>
        {authorsData?.map((author, index) => (
          <ListItem
            key={author.id}
            disablePadding
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
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
                  <Typography sx={{ color: "text.primary" }}>
                    {author?.name}
                  </Typography>
                  <AuthorDescription
                    authorQuery={{
                      data: author,
                      isLoading: areAuthorsLoading,
                      isError: areAuthorsError,
                    }}
                  />
                </Box>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function Category({ category, selected, setCategory }) {
  return (
    <Button
      sx={{ opacity: selected ? 1 : 0.5 }}
      onClick={() => setCategory(category)}
      variant="outlined"
      color="secondary"
    >
      {category}
    </Button>
  );
}
