import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Stack,
  LinearProgress,
} from "@mui/material";
import {
  register,
  login,
  rollDice,
  fetchStats,
  clearSession,
} from "../../frontendreact/src/api";

import FieldWay from "./components/FieldWay";
import HornBets from "./components/HornBets";
import HardWays from "./components/HardWays";
import HotColdSummary from "./components/HotColdSummary";
import DiceSelector from "../../frontendreact/src/components/DiceSelector";
import RollHistory from "../../frontendreact/src/components/RollHistory";

function EmpiricalBarGraph({ probabilities }) {
  return (
    <Box sx={{ width: "100%", px: 2, py: 1 }}>
      <Typography variant="h6" gutterBottom>
        Empirical Probabilities
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

function AuthForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await register(username, password);
      }
      const res = await login(username, password);
if (!res || !res.token) {
  throw new Error("Invalid response from server");
}
localStorage.setItem("token", res.token);
onLogin(res.token);
    } catch (err) {
      setError(err.message || "Login/register failed");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {isRegister ? "Register" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button variant="contained" type="submit" fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>
          <Button
            onClick={() => setIsRegister(!isRegister)}
            fullWidth
            color="secondary"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [stats, setStats] = useState({
    probabilities: {},
    frequencies: {},
    total: 0,
  });
  const [rolls, setRolls] = useState([]);

  const loadStats = useCallback(async () => {
    if (!token) return;
    try {
      const data = await fetchStats(token);
      setStats(data);
      setRolls(data.rolls);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  }, [token]);

  const handleRoll = async (sum) => {
    try {
      await rollDice(token, sum);
      await loadStats();
    } catch (err) {
      console.error("Roll failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setStats({
      probabilities: {},
      frequencies: {},
      total: 0,
    });
    setRolls([]);
  };

  const handleClearSession = async () => {
    try {
      await clearSession(token);
      await loadStats();
    } catch (err) {
      console.error("Clear failed:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (!token) {
    return <AuthForm onLogin={setToken} />;
  }

  return (
    <Container sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Kurappusu</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleClearSession}>
            Clear
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>

      <EmpiricalBarGraph probabilities={stats.probabilities} />
      <DiceSelector onRoll={handleRoll} />
      <RollHistory rolls={rolls} />
      <HardWays rolls={rolls} />
      <HornBets rolls={rolls} />
      <FieldWay rolls={rolls} />
      <HotColdSummary frequencies={stats.frequencies} total={stats.total} />
    </Container>
  );
}
