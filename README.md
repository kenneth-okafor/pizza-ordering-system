# Pizza Ordering System

**A full-stack web application built with Next.js, React, MongoDB and Material UI.**

## Project Overview

The Pizza Ordering System is a full-stack web application developed as part of my Computing (Informatics) coursework at TU Dublin.

The application allows customers to register, log in, browse available food products, manage a shopping cart and complete the checkout process.

The project demonstrates practical experience in full-stack web development, database integration, API development and building interactive user interfaces.

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Full-stack application framework |
| React | Interactive user interfaces |
| JavaScript | Application functionality |
| MongoDB | Database management |
| Material UI (MUI) | User interface components |
| Docker | Local MongoDB development environment |
| Git & GitHub | Version control |

## Key Features

**User Authentication**
- Customer registration and login functionality.
- User account information stored using MongoDB.

**Product Browsing**
- Display available pizzas, sides, desserts and drinks.
- View individual product information.
- Retrieve product data through API endpoints.

**Shopping Cart**
- Add products to the cart.
- View selected products.
- Remove products from the cart.

**Checkout**
- Review selected items before checkout.
- Complete the application's checkout flow.
- Display an order confirmation page.

**Database Integration**
- MongoDB integration for application data.
- API routes for product retrieval, user accounts and cart operations.

## Project Structure

```text
pizza-ordering/
├── app/
│   ├── api/
│   ├── checkout/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── thankyou/
│   ├── viewCart/
│   └── viewProduct/
├── lib/
│   └── mongodb.js
├── public/
├── package.json
└── README.md
```

## Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/kenneth-okafor/pizza-ordering-system.git
```

**2. Navigate into the project**

```bash
cd pizza-ordering-system
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure MongoDB**

Ensure MongoDB is running locally or through Docker.

Create a `.env.local` file in the project root and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017
```

Adjust the connection string if your database uses authentication or another host.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit http://localhost:3000 in your browser.

The application requires appropriate MongoDB data to display products and support database-dependent features.

## Screenshots

Screenshots of the completed application can be added here:

- Homepage and product catalogue
- Login and registration pages
- Shopping cart
- Checkout page
- Order confirmation

## Skills Demonstrated

- Full-stack web application development
- React components and state management
- Next.js routing and API development
- MongoDB database integration
- Asynchronous JavaScript
- Debugging and problem-solving
- Version control with Git and GitHub

## Future Improvements

Potential enhancements include:

- Online payment integration
- Order history and tracking
- Administrator dashboard for product management
- Improved automated testing
- Cloud deployment

## Author

**Kenneth Jr Okafor**

BSc Computing (Informatics) — TU Dublin

[GitHub Profile](https://github.com/kenneth-okafor)

Developed as an academic full-stack web development project.or more details.
