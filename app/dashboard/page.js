"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Stack
} from "@mui/material";

export default function DashboardPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/api/getProducts");
      const data = await response.json();

      setProducts(data);
    }

    loadProducts();
  }, []);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === category.toLowerCase()
        );

  function logout() {
    localStorage.removeItem("username");
    router.push("/login");
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
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

          <Button
            color="inherit"
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold" }}
          >
            Our Menu
          </Typography>

          <Typography
            variant="h6"
            sx={{ mt: 1 }}
          >
            Choose your favourite food
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
          justifyContent: "center",
          flexWrap: "wrap",
          mb: 5 
        }}
        >
          <Button
            variant={category === "All" ? "contained" : "outlined"}
            onClick={() => setCategory("All")}
          >
            All
          </Button>

          <Button
            variant={category === "Pizza" ? "contained" : "outlined"}
            onClick={() => setCategory("Pizza")}
          >
            Pizzas
          </Button>

          <Button
            variant={category === "Side" ? "contained" : "outlined"}
            onClick={() => setCategory("Side")}
          >
            Sides
          </Button>

          <Button
            variant={category === "Drink" ? "contained" : "outlined"}
            onClick={() => setCategory("Drink")}
          >
            Drinks
          </Button>

          <Button
            variant={category === "Dessert" ? "contained" : "outlined"}
            onClick={() => setCategory("Dessert")}
          >
            Desserts
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product._id}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={product.image || "/pizza-placeholder.jpg"}
                  alt={product.pname}
                  sx={{
                    objectFit: "cover"
                  }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.pname}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>

                  <Typography variant="body2">
                    Category: {product.category}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ mt: 2 }}
                  >
                    €{product.cost}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      router.push(
                        `/viewProduct?id=${product._id}`
                      )
                    }
                  >
                    View Product
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}