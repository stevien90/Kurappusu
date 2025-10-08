import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function DiceSelector({ onRoll }) {
  const [dice1, setDice1] = useState(null);
  const [dice2, setDice2] = useState(null);

  const handleSubmit = () => {
    if (dice1 && dice2) {
      onRoll(dice1 + dice2);
      setDice1(null);
      setDice2(null);
    }
  };

  const renderButtons = (selected, setSelected) =>
    [1, 2, 3, 4, 5, 6].map((num) => (
      <Button
        key={num}
        variant={selected === num ? "contained" : "outlined"}
        onClick={() => setSelected(num)}
        sx={{
          minWidth: 40,
          minHeight: 40,
          flex: "1 1 14%",
        }}
      >
        {num}
      </Button>
    ));

  return (
    <Box sx={{ py: 2, px: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Select Dice
      </Typography>

      <Stack spacing={2} mb={2}>
        <Box>
          <Typography align="center" mb={1}>
            Dice 1
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
          >
            {renderButtons(dice1, setDice1)}
          </Stack>
        </Box>

        <Box>
          <Typography align="center" mb={1}>
            Dice 2
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
          >
            {renderButtons(dice2, setDice2)}
          </Stack>
        </Box>
      </Stack>

      <Typography align="center" mb={2}>
        Total: {dice1 && dice2 ? dice1 + dice2 : "-"}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={!dice1 || !dice2}
      >
        Enter Roll
      </Button>
    </Box>
  );
}
