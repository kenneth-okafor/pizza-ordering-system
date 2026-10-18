"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Divider,
  Stack
} from "@mui/material";

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    async function loadCart() {
      const username = localStorage.getItem("username");

      if (!username) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `/api/getCart?username=${username}`
        );

        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setCartItems(data);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    loadCart();
  }, [router]);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.cost),
    0
  );

  async function placeOrder() {
    const username = localStorage.getItem("username");

    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch("/api/checkOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          address,
          paymentMethod,
          items: cartItems,
          total
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "orderNumber",
          data.orderNumber
        );

        router.push("/thankyou");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold"
            }}
          >
            Pizza Ordering
          </Typography>

          <Button
            color="inherit"
            onClick={() => router.push("/dashboard")}
          >
            Menu
          </Button>

          <Button
            color="inherit"
            onClick={() => router.push("/viewCart")}
          >
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4
          }}
        >
          Checkout
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 800,
            mx: "auto"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2
            }}
          >
            Delivery Details
          </Typography>

          <TextField
            label="Delivery Address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            fullWidth
            required
            multiline
            rows={3}
            sx={{ mb: 4 }}
          />

          <FormControl sx={{ mb: 4 }}>
            <FormLabel>
              Payment Method
            </FormLabel>

            <RadioGroup
              value={paymentMethod}
              onChange={(event) =>
                setPaymentMethod(event.target.value)
              }
            >
              <FormControlLabel
                value="Cash"
                control={<Radio />}
                label="Cash on Delivery"
              />

              <FormControlLabel
                value="Card"
                control={<Radio />}
                label="Card"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2
            }}
          >
            Order Summary
          </Typography>

          {cartItems.map((item) => (
            <Box
              key={item._id}
              sx={{ mb: 2 }}
            >
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between"
                }}
              >
                <Typography>
                  {item.item}
                </Typography>

                <Typography>
                  €{Number(item.cost).toFixed(2)}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
              >
                Size: {item.size}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3
            }}
          >
            Total: €{total.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={placeOrder}
          >
            Place Order
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() =>
              router.push("/viewCart")
            }
          >
            Back to Cart
          </Button>
        </Paper>
      </Container>
    </>
  );
}