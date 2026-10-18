"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    pass: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
  event.preventDefault();

  console.log("Login button clicked");

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Login response:", data);

    if (response.ok) {
      localStorage.setItem("username", data.username);
      router.push("/dashboard");
    } else {
      setMessage(data.message || "Invalid username or password");
    }
  } catch (error) {
    console.error("LOGIN PAGE ERROR:", error);
    setMessage("Login failed. Please check the server.");
  }
}
  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="pass"
            type="password"
            value={form.pass}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>

          {message && (
            <Typography
              align="center"
              sx={{ marginTop: 2 }}
              color="error"
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}