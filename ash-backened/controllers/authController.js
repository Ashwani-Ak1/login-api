const bcrypt = require("bcrypt");
const users = require("../data/users");
const { validateLoginInput } = require("../utils/validator");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    const errors = validateLoginInput(email, password);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    // Find user
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Login successful. Welcome ${user.email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { loginUser };