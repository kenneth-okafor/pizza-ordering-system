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
  Box,
  Divider,
  Stack
} from "@mui/material";

export default function ViewCartPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);

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
      setCartItems([]);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function removeItem(id) {
    const response = await fetch(
      `/api/removeFromCart?id=${id}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (response.ok) {
      loadCart();
    } else {
      alert(data.message);
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.cost),
    0
  );

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

          <Button color="inherit">
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
          Your Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6">
              Your cart is empty.
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() =>
                router.push("/dashboard")
              }
            >
              View Menu
            </Button>
          </Paper>
        ) : (
          <Paper sx={{ p: 4 }}>
            {cartItems.map((item) => (
              <Box
                key={item._id}
                sx={{ mb: 3 }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row"
                  }}
                  sx={{
                    justifyContent:
                      "space-between",
                    alignItems: {
                      xs: "flex-start",
                      sm: "center"
                    },
                    gap: 2
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold"
                      }}
                    >
                      {item.item}
                    </Typography>

                    <Typography>
                      Size: {item.size}
                    </Typography>

                    <Typography>
                      €{Number(item.cost).toFixed(2)}
                    </Typography>

                    {item.toppings && (
                      <Typography variant="body2">
                        Toppings:{" "}
                        {Object.entries(
                          item.toppings
                        )
                          .filter(
                            ([key, value]) =>
                              value
                          )
                          .map(([key]) =>
                            key
                              .replace(
                                /([A-Z])/g,
                                " $1"
                              )
                              .replace(
                                /^./,
                                (str) =>
                                  str.toUpperCase()
                              )
                          )
                          .join(", ") ||
                          "None"}
                      </Typography>
                    )}
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </Button>
                </Stack>

                <Divider sx={{ mt: 3 }} />
              </Box>
            ))}

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mt: 3
              }}
            >
              Total: €{total.toFixed(2)}
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row"
              }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  router.push("/checkout")
                }
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  router.push("/dashboard")
                }
              >
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        )}
      </Container>
    </>
  );
}