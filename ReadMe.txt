### Code Attribution & README

Done by 
Morena Nkosi -ST10091000
Luyanda Nkosi -ST10069575
Wavhudi Tshibubudze -ST10143181

---

# Customer Payments Portal

This is a secure customer international payments portal that allows users to register, log in, and make international payments. It uses **React** for the front-end, **Node.js** with **Express** for the back-end, and **MongoDB** as the database.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running on your machine)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/WavhudiTshibubudze/test-for-the-APDS.git
cd C:\Users\wavhu\customer-portal -3000
cd C:\Users\wavhu\customer-portal\backend -5000/node server.js
```

2. **Install dependencies:**

Navigate to the `payments-backend/` folder and install the server dependencies:

```bash
cd payments-backend
npm install
```

Then, navigate to the root `customer-payments-portal/` directory and install the client dependencies:

```bash
cd ..
npm install
```

### Run the application

#### 1. Start the back-end server:

Navigate to the `payments-backend/` directory and start the server:

```bash
cd payments-backend
node api.js
```

The server should now be running on `http://localhost:5000`.

#### 2. Start the front-end React application:

Navigate to the root directory and run:

```bash
npm start
```

The React application will now be running at `http://localhost:3000`.

### API Endpoints

- **Register:** `POST /api/users/register`
- **Login:** `POST /api/users/login`
- **Payment:** `POST /api/payments`
- **Employee POST /api/employees`

You can test these endpoints using Postman or directly via the React app.

## Features

- **Registration:** Allows users to register by providing their full name, ID number, account number, and password. The ID number is validated using the Luhn algorithm for South African ID numbers.
- **Login:** Users log in using their ID number and password.
- **International Payments:** After logging in, users can make international payments by entering the amount, currency, SWIFT code, and destination account number.
- **EmployeeLogin:** Employees are preloaded and login to the application where they are taken to the dashboard where they verify and submit payments.

### Technologies Used

- **Frontend:** React, Axios, CSS (for styling)
- **Backend:** Node.js, Express, MongoDB (Mongoose for schemas)
- **Security:** Password hashing (bcrypt), ID number validation (Luhn algorithm)

### Code Attribution

The following external resources were referenced or used in the project:

- **React Documentation**: https://reactjs.org/docs/getting-started.html
- **Node.js Documentation**: https://nodejs.org/en/docs/
- **Mongoose Documentation**: https://mongoosejs.com/docs/guide.html
- **Luhn Algorithm for ID validation**: Referenced from standard Luhn algorithm implementation for validating South African ID numbers.
- **CSS Reset**: Basic reset styles were inspired by recommendations from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

---

### License

This project is licensed under the MIT License.

---

### Feedback

If you encounter any issues, feel free to raise an issue in this repository or contact the project owner for support.

### Future Enhancements

- **Implement JWT** for more secure token-based authentication.
- **Multi-language support** to cater to more users.
- **Transaction history** so users can view and track their payments.

---

This README provides a comprehensive guide to setting up, running, and maintaining the Customer Payments Portal.