"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Button
} from "@mui/material";

export default function ThankYouPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const number = localStorage.getItem("orderNumber");
    setOrderNumber(number || "N/A");
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          padding: 4,
          marginTop: 6,
          textAlign: "center"
        }}
      >
        <Typography variant="h3" gutterBottom>
          Thank You!
        </Typography>

        <Typography variant="h5" gutterBottom>
          Your order has been placed successfully.
        </Typography>

        <Typography sx={{ marginTop: 2 }}>
          Order Number:
        </Typography>

        <Typography
          variant="h6"
          sx={{ marginBottom: 2 }}
        >
          {orderNumber}
        </Typography>

        <Typography>
          Estimated delivery time: 30-40 minutes
        </Typography>

        <Button
          variant="contained"
          sx={{ marginTop: 3 }}
          onClick={() => router.push("/dashboard")}
        >
          Back to Menu
        </Button>
      </Paper>
    </Container>
  );
}