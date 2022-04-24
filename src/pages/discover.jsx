import React, { useState } from "react";
import { useRouter } from "next/router";
import useDebounce from "../hooks/useDebounce";
import useSearch from "../hooks/useSearch";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import NextLinkComposed from "../components/NextLinkComposed";
import { AuthorProfile } from "../components/edition/TopTweet";
import {
  TextField,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryMap from "../components/Category";

export default function Author() {
  const mobile = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <Box
        sx={{
          p: mobile ? 2 : 8,
          pt: mobile ? 4 : 8,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="large"
            fontFamily="p22-mackinac-pro"
            fontWeight={500}
            component="h1"
          >
            Discover
          </Typography>
          <SearchBar />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="large"
            fontFamily="p22-mackinac-pro"
            fontWeight={500}
            component="h1"
          >
            Curated
          </Typography>
          <CategoryMap />
        </Box>
      </Box>
    </div>
  );
}

const SearchBar = () => {
  const [filter, setFilter] = useState(null);
  const [focus, setFocus] = useState(false);

  const debouncedFilter = useDebounce(filter, 500);
  const { data, isLoading } = useSearch(debouncedFilter);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleClickAway = () => {
    setFocus(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.alert(filter);
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box sx={{ position: "relative" }}>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            placeholder="Search authors..."
            value={filter}
            autoComplete={"off"}
            onChange={handleChange}
            onFocus={handleFocus}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                fontWeight: 300,
              },
            }}
          >
            <input type="submit" hidden />
          </TextField>
        </form>
        {focus && <SearchResults data={data} isLoading={isLoading} />}
      </Box>
    </ClickAwayListener>
  );
};

const SearchResults = ({ data, isLoading }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        position: "absolute",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 2,
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : data?.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <List>
            {data?.map((author) => (
              <ListItem key={author.id} disablePadding>
                <ListItemButton
                  to={{ pathname: `/edition/${author?.username}` }}
                  component={NextLinkComposed}
                >
                  <AuthorProfile
                    key={author.id}
                    authorQuery={{
                      data: author,
                      isLoading: false,
                      isError: false,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography
          variant="small"
          component="span"
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          Search by Twitter username
        </Typography>
      )}
    </Paper>
  );
};

Author.auth = true;
