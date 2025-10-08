import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

const HORN_BETS = [2, 3, 11, 12];

export default function HornBets({ rolls }) {
  const totalRolls = rolls.length;
  const lastRoll = rolls[0]?.value ?? null;

  const counts = HORN_BETS.reduce((acc, value) => {
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
        Horn Bets
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {HORN_BETS.map((val) => {
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
