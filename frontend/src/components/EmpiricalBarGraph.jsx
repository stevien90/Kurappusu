import React from "react";
import { Box, Typography, Stack, LinearProgress } from "@mui/material";

export default function EmpiricalBarGraph({ probabilities }) {
  return (
    <Box sx={{ width: "100%", px: 2, py: 1 }}>
      <Typography variant="h6" gutterBottom>
        Empirical Probabilities (Bar Graph)
      </Typography>
      <Stack spacing={1}>
        {Object.entries(probabilities).map(([num, prob]) => (
          <Box key={num} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ width: 20 }}>{num}</Typography>
            <LinearProgress
              variant="determinate"
              value={prob * 100}
              sx={{ flexGrow: 1, mx: 1, height: 16, borderRadius: 1 }}
            />
            <Typography sx={{ width: 50, textAlign: "right" }}>
              {(prob * 100).toFixed(1)}%
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
