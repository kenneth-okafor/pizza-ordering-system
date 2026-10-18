"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstname: "",
    secondname: "",
    username: "",
    pass: "",
    address: ""
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

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setForm({
        firstname: "",
        secondname: "",
        username: "",
        pass: "",
        address: ""
      });
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Surname"
            name="secondname"
            value={form.secondname}
            onChange={handleChange}
            margin="normal"
            required
          />

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

          <TextField
            fullWidth
            label="Delivery Address"
            name="address"
            value={form.address}
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
            Register
          </Button>

          {message && (
            <Typography align="center" sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}