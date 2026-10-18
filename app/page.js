"use client";

import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  Grid
} from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Pizza Ordering
          </Typography>

          <Button
            color="inherit"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>

          <Button
            color="inherit"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>

          <Button
            color="inherit"
            onClick={() => router.push("/viewCart")}
          >
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box
          sx={{
            textAlign: "center",
            paddingTop: 8,
            paddingBottom: 8
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
          >
            Fresh Pizza Delivered Fast
          </Typography>

          <Typography
            variant="h6"
            sx={{ marginBottom: 3 }}
          >
            Browse our menu, choose your favourite food
            and order online.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/dashboard")}
          >
            View Menu
          </Button>
        </Box>

        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 4 }}
        >
          Featured Items
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Pepperoni Pizza
                </Typography>

                <Typography sx={{ marginTop: 1 }}>
                  Classic pepperoni pizza with cheese
                  and tomato sauce.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ marginTop: 2 }}
                >
                  €10.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Margherita Pizza
                </Typography>

                <Typography sx={{ marginTop: 1 }}>
                  Mozzarella, tomato sauce and herbs.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ marginTop: 2 }}
                >
                  €9.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Garlic Bread
                </Typography>

                <Typography sx={{ marginTop: 1 }}>
                  Garlic bread topped with melted cheese.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ marginTop: 2 }}
                >
                  €5.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}