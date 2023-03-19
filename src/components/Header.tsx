import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

export default function Header() {
  return (
    <Box mb={5} sx={{ paddingY: 3, borderBottom: "1px solid blue" }}>
      <Container>
        <Typography variant="h5" color={"secondary.main"}>
          Courses platform
        </Typography>
      </Container>
    </Box>
  );
}
