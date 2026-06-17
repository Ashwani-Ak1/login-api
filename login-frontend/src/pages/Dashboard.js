// import { Navigate } from "react-router-dom";

// function Dashboard() {
//   const userEmail =
//     localStorage.getItem("userEmail");

//   if (!userEmail) {
//     return <Navigate to="/" />;
//   }

//   const logout = () => {
//     localStorage.removeItem("userEmail");
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>
//         Hello {userEmail}! Welcome
//       </h1>

//       <button onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Dashboard;


import { Navigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    return <Navigate to="/" />;
  }

  const logout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      
      {/* Navbar */}
      <div className="navbar">
        <h2 className="logo">Siage Dashboard</h2>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Card */}
      <div className="card">
        <h1 className="heading">👋 Welcome Back</h1>

        <p className="email">
          Logged in as: <span>{userEmail}</span>
        </p>

        <div className="grid">
          <div className="box">
            <h3>📊 Analytics</h3>
            <p>View your performance overview</p>
          </div>

          <div className="box">
            <h3>📝 Tasks</h3>
            <p>Manage your daily tasks</p>
          </div>

          <div className="box">
            <h3>⚙️ Settings</h3>
            <p>Update your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;