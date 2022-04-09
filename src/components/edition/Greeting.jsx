import React from "react";
import { useSession } from "next-auth/react";
import { Typography, Container, Icon } from "@mui/material";
import Link from "../Link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useAuthors from "../../hooks/useAuthors";

export default function Greeting() {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useAuthors();

  return (
    <div>
      <Typography
        sx={{ my: 2, fontSize: "24px", textAlign: "center" }}
        variant="h1"
        component="h1"
      >
        Hello, {session?.user?.name}
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="p">
        Your next edition will be available on Sunday!
      </Typography>

      <Container
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={"/edition"}>
          This Week&apos;s Edition{" "}
          <Icon fontSize="small" component={ChevronRightIcon} />
        </Link>
      </Container>
    </div>
  );
}
