const bcrypt = require("bcrypt");
const User = require("../model/User");
const { validateLoginInput } = require("../utils/validator");
console.log("USER MODEL:", User);
console.log(require.resolve("../model/User"));
// LOGIN
const loginUser = async (req, res) => {
  console.log("LOGIN BODY:", req.body);

  try {
    const { email, password } = req.body;

    const errors = validateLoginInput(email, password);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

   const user = await User.findOne({
  where: { email }
});

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log("DB PASSWORD:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH RESULT:", isMatch);

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
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REGISTER
const registerUser = async (req, res) => {
  console.log("User Model Name:", User.name);
console.log("User Methods:", Object.keys(User));
  console.log("REGISTER HIT");
  console.log("REGISTER BODY:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const existingUser = await User.findOne({
  where: { email }
});

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("HASH CREATED");

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    console.log("USER CREATED:", user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};