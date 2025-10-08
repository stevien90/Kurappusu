import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

const FIELD_WAY = [2, 3, 4, 9, 10, 11, 12];

export default function FieldWay({ rolls }) {
  const totalRolls = rolls.length;
  const lastRoll = rolls[0]?.value ?? null;

  const counts = FIELD_WAY.reduce((acc, value) => {
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
        Field Way
      </Typography>

<Stack
  direction="row"
  flexWrap="wrap"
  gap={1.5}  // adds spacing both horizontally and vertically
  sx={{ justifyContent: "flex-start" }}
>
  {FIELD_WAY.map((val) => {
    const count = counts[val];
    const percentage = totalRolls > 0 ? (count / totalRolls) * 100 : 0;
    const isLast = lastRoll === val;

    return (
      <Paper
        key={val}
        elevation={isLast ? 6 : 2}
        sx={{
          width: 70,  // fixed width
          height: 70, // fixed height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isLast ? "primary.main" : "background.paper",
          color: isLast ? "primary.contrastText" : "text.primary",
          borderRadius: 2,
          boxSizing: "border-box",
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
