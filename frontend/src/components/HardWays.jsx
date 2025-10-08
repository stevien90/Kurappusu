import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

// These are the valid "hard way" values
const HARD_WAYS = [4, 6, 8, 10];

export default function HardWays({ rolls }) {
  const totalRolls = rolls.length;
  const lastRoll = rolls[0]?.value ?? null;

  // Count how many times each hard way was rolled
  const counts = HARD_WAYS.reduce((acc, value) => {
    acc[value] = rolls.filter((r) => r.value === value).length;
    return acc;
  }, {});

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        borderTop: "1px solid #ccc",
        bgcolor: "background.default",
        mt: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Hard Ways
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {HARD_WAYS.map((val) => {
          const count = counts[val];
          const percentage = totalRolls > 0 ? (count / totalRolls) * 100 : 0;
          const isLast = lastRoll === val;

          return (
            <Paper
              key={val}
              elevation={isLast ? 6 : 2}
              sx={{
                minWidth: 72,
                height: 64,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isLast ? "primary.main" : "background.paper",
                color: isLast ? "primary.contrastText" : "text.primary",
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="bold">{val}</Typography>
              <Typography variant="caption">{count}x</Typography>
              <Typography variant="caption">{percentage.toFixed(1)}%</Typography>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
