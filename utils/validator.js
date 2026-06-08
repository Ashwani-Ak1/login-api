const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateLoginInput = (email, password) => {
  const errors = [];

  if (!email) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Invalid email format");

  if (!password) errors.push("Password is required");

  return errors;
};

module.exports = { validateLoginInput };