import React from "react";
import { Box, Typography, Stack } from "@mui/material";

export default function ProbabilityDisplay({ probabilities }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        overflowX: "auto",
        py: 1,
        px: 2,
        bgcolor: "background.paper",
        borderBottom: "1px solid #ccc",
      }}
    >
      {Object.entries(probabilities).map(([num, prob]) => (
        <Box
          key={num}
          sx={{
            minWidth: 50,
            borderRadius: 1,
            bgcolor: "primary.light",
            color: "primary.contrastText",
            textAlign: "center",
            px: 1,
            py: 0.5,
            userSelect: "none",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {num}:
          </Typography>
          <Typography variant="body2">
            {(prob * 100).toFixed(1)}%
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
