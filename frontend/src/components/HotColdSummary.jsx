import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

function findHotCold(frequencies, keys, limit = 3) {
  const filtered = keys.map((k) => ({ value: k, count: frequencies[k] || 0 }));
  const sortedDesc = [...filtered].sort((a, b) => b.count - a.count);
  const sortedAsc = [...filtered].sort((a, b) => a.count - b.count);

  return {
    hot: sortedDesc.slice(0, limit),
    cold: sortedAsc.slice(0, limit),
  };
}

function Section({ title, frequencies, keys, total, limit = 3 }) {
  const { hot, cold } = findHotCold(frequencies, keys, limit);

  const renderNumber = ({ value, count }, isHot = false, isCold = false) => {
    const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
    return (
      <Paper
        key={value}
        elevation={isHot || isCold ? 6 : 2}
        sx={{
          minWidth: 60,
          height: 75,
          px: 1.5,
          py: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 0.5,
          borderRadius: 2,
          bgcolor: isHot
            ? "rgba(255, 140, 0, 0.85)"
            : isCold
            ? "rgba(30, 144, 255, 0.85)"
            : "background.paper",
          border: isHot
            ? "2px solid #FF8C00"
            : isCold
            ? "2px solid #1E90FF"
            : "1px solid #ccc",
          color: "common.white",
          boxShadow: isHot || isCold ? 4 : 1,
        }}
      >
        <Typography fontWeight="bold" variant="h5" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium", mt: 0.25 }}>
          {count}x
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          {percentage}%
        </Typography>
      </Paper>
    );
  };

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Hot Numbers
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {hot.map((num) => renderNumber(num, true, false))}
      </Stack>

      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Cold Numbers
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {cold.map((num) => renderNumber(num, false, true))}
      </Stack>
    </Box>
  );
}

const ALL_NUMBERS = Array.from({ length: 12 }, (_, i) => i + 1);
const HARD_WAYS = [4, 6, 8, 10];
const FIELD_WAY = [2, 3, 4, 9, 10, 11, 12];
const HORN_BETS = [2, 3, 11, 12];

export default function HotColdSummary({ frequencies, total }) {
  return (
    <Box sx={{ px: 2, py: 1, maxWidth: 400, mx: "auto" }}>
      <Section
        title="All Outcomes"
        frequencies={frequencies}
        keys={ALL_NUMBERS}
        total={total}
        limit={3}
      />
      <Section
        title="Hard Ways"
        frequencies={frequencies}
        keys={HARD_WAYS}
        total={total}
        limit={1}
      />
      <Section
        title="Field Way"
        frequencies={frequencies}
        keys={FIELD_WAY}
        total={total}
        limit={3}
      />
      <Section
        title="Horn Bets"
        frequencies={frequencies}
        keys={HORN_BETS}
        total={total}
        limit={1}
      />
    </Box>
  );
}
