const bcrypt = require("bcrypt");

// Pre-hashed password: "Test@123"
const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("Test@123", 10),
  },
  {
    id: 2,
    email: "john@example.com",
    password: bcrypt.hashSync("John@123", 10),
  },
  {
    id: 3,
    email: "alice@example.com",
    password: bcrypt.hashSync("Alice@123", 10),
  },

];
console.log(users); 
module.exports = users;