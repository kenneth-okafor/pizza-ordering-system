"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Stack
} from "@mui/material";

export default function ViewProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("Large");

  const [toppings, setToppings] = useState({
    extraCheese: false,
    mushrooms: false,
    onions: false
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/getSingleProduct?id=${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data);
          return;
        }

        setProduct(data);

        if (data.size) {
          setSize(data.size);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  function handleToppingChange(event) {
    setToppings({
      ...toppings,
      [event.target.name]: event.target.checked
    });
  }

  async function addToCart() {
    const username = localStorage.getItem("username");

    if (!username) {
      alert("Please login before adding items to your cart.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          productId: product._id,
          item: product.pname,
          cost: product.cost,
          size: size,
          toppings: toppings
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added to cart!");
        router.push("/viewCart");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart.");
    }
  }

  if (!product) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>Loading product...</Typography>
      </Container>
    );
  }

  const isPizza = product.category === "Pizza";

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
        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: 850,
            mx: "auto"
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.pname}
            sx={{
              width: "100%",
              height: 350,
              objectFit: "cover",
              borderRadius: 2,
              mb: 3
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 1
            }}
          >
            {product.pname}
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 2 }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3
            }}
          >
            €{product.cost}
          </Typography>

          {isPizza && (
            <>
              <FormControl sx={{ mb: 3 }}>
                <FormLabel>
                  Choose Size
                </FormLabel>

                <RadioGroup
                  value={size}
                  onChange={(event) =>
                    setSize(event.target.value)
                  }
                >
                  <FormControlLabel
                    value="Small"
                    control={<Radio />}
                    label="Small"
                  />

                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label="Medium"
                  />

                  <FormControlLabel
                    value="Large"
                    control={<Radio />}
                    label="Large"
                  />
                </RadioGroup>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 1 }}
                >
                  Extra Toppings
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="extraCheese"
                      checked={toppings.extraCheese}
                      onChange={handleToppingChange}
                    />
                  }
                  label="Extra Cheese"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="mushrooms"
                      checked={toppings.mushrooms}
                      onChange={handleToppingChange}
                    />
                  }
                  label="Mushrooms"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="onions"
                      checked={toppings.onions}
                      onChange={handleToppingChange}
                    />
                  }
                  label="Onions"
                />
              </Box>
            </>
          )}

          {!isPizza && (
            <Typography sx={{ mb: 3 }}>
              Size: {product.size}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              variant="contained"
              size="large"
              onClick={addToCart}
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                router.push("/dashboard")
              }
            >
              Back to Menu
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}