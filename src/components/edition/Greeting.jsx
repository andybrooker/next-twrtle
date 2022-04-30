import React from "react";
import { useSession } from "next-auth/react";
import { Typography, Container, Icon } from "@mui/material";
import Link from "../Link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DateTime } from "luxon";

export default function Greeting() {
  const { data: session } = useSession();

  return (
    <div>
      <Typography
        sx={{ my: 2, fontSize: "24px", fontWeight: 500, textAlign: "center" }}
        variant="h1"
        component="h1"
      >
        Hello, {session?.user?.name}
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="p">
        {DateTime.now().weekday !== 7
          ? "Your next edition will be available on Sunday!"
          : "Your latest edition is available today!"}
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
