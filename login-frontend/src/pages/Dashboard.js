import { Navigate } from "react-router-dom";

function Dashboard() {
  const userEmail =
    localStorage.getItem("userEmail");

  if (!userEmail) {
    return <Navigate to="/" />;
  }

  const logout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Hello {userEmail}! Welcome
      </h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;