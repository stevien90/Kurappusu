import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function RollHistory({ rolls }) {

  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        borderTop: "1px solid #ccc",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Roll History</Typography>
        <Typography variant="body1" color="text.secondary">
          {rolls.length}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mt: 1,
        }}
      >
        {rolls.length === 0 ? (
          <Typography>No rolls yet</Typography>
        ) : (
          rolls.map(({ value }, i) => {
            const isLast = i === 0;

            return (
              <Paper
                key={i}
                elevation={isLast ? 6 : 2}
                sx={{
                  width: 48,
                  height: 48,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  backgroundColor: isLast ? "primary.main" : "background.paper",
                  color: isLast ? "primary.contrastText" : "text.primary",
                }}
              >
                {value}
              </Paper>
            );
          })
        )}
      </Box>
    </Box>
  );
}
