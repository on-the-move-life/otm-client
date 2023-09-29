import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated, error } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = (e) => {
    e.preventDefault();

    if (email && password) {
      const body = {
        email,
        password,
        isGoogleLogin: false,
      };

      login(body);
    }
  };

  useEffect(() => {
    /* global google */

    const handleGoogleAuth = (res) => {
      const body = {
        credential: res.credential,
        isGoogleLogin: true,
      };
      login(body);
    };

    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleAuth,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // theme: "filled_black",
        text: "signin_with",
        shape: "pill",
      });
    }
  }, [login]);

  useEffect(() => {
    if (isAuthenticated) navigate("/home", {replace: true});
    else navigate("/new-user", {replace: true});
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-100 h-100 py-8">
      <h1 className="font-medium text-4xl">Join In</h1>
      <main>
        <div className="py-6">
          <form action="post" onSubmit={handleEmailAuth}>
            <input
              type="email"
              name=""
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name=""
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="text-center mb-6">OR</div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex justify-center items-center" id="loginDiv"></div>
      </main>
      {/* <footer>
        Don't have an account?
        <Link to="/signup"> Create One</Link>
      </footer> */}
    </div>
  );
};

export default Login;
