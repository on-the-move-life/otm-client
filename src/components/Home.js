import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h1>Dear {user?.email}</h1>

      <p>You are successfully logged in</p>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
