import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "http://localhost:882/auth/login";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //google auth
  const handleAuth = async (body) => {
    setLoading(true);
    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        console.log(data, "data");
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));

          if (data?.isSignUp) {
            navigate("/new-user", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return { loading, error, handleAuth };
};

export default useAuth;
