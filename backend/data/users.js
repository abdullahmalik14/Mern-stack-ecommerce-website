const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "malikabdullahmalik14@gmail.com",
    password: "password123",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "abdullah.asim710@gmail.com",
    password: "password123",
    isAdmin: false,
  },
];

module.exports = users;
