import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "userEmail",
          formData.email
        );

        setMessage(data.message);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Server Error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        
        <form
          className="form-wrapper"
          onSubmit={handleSubmit}
        >
          <h1>Login to Siage Solution</h1>

          <p className="subtitle">
    Access your workspace and continue where you left off.
          </p>

          {message && (
            <p className="success">{message}</p>
          )}

          {error && (
            <p className="error">{error}</p>
          )}

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          <p className="signup-link">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <img
          src="https://images.openai.com/static-rsc-4/ZRkflvz5_IhZ6q_PufDnchJNDD1UxzZQKSr0h1UejybzmxFolBxGWyKZhE_K0c68Qm4-4oNHJ3EgkCF_NVzc9eAa0OhXPlNtlniiQxnmTKPnOAGVfD3L2dPqdkcA2nj-plIOx6FpsbNjzgBEYB3bS7Q0eJk8kg47xFfpGkp6BsQrjCe49CXPYjPp5Wh61q-Q?purpose=fullsize"
          alt="Login"
        />
      </div>
    </div>
  );
}

export default LoginPage;