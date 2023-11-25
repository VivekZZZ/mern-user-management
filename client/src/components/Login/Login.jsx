import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../home.module.css";
import { useAuth } from "../../Auth/AuthContext";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let { login, isAuthenticated } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (error || success) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [error, success]);

  let formHandle = (e) => {
    e.preventDefault();
    let payload = {
      email,
      password,
    };
    //                isAuthenticated message remains false
    axios
      .post("http://localhost:3001/loginAdmin", payload)
      .then((res) => {
        if (res.data === "SUCCESS") {
          console.log(res);
          setSuccess("Login Successful");
          login();
          console.log(isAuthenticated);
          setTimeout(() => {
            navigate("/createUser");
          }, 1000);
        } else if (res.data === "INCORRECT_EMAIL") {
          setError("Incorrect Email");
        } else if (res.data === "INCORRECT_PASSWORD") {
          setError("Incorrect Password");
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div id={style.form}>
      <form>
        <h1> Login Here ....</h1>
        {success && (
          <p
            style={{
              color: "green",
                fontSize: "16px",
                textAlign: "center"
            }}
          >
            {success}
          </p>
        )}
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "16px",
              textAlign: "center"
            }}
          >
            {error}
          </p>
        )}
        <div className={style.row}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={style.row}>
          <label htmlFor="">Password</label>
          <input
            type="text"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={style.row} style={{ justifyContent: "center" }}>
          <button onClick={formHandle}>LOGIN</button>
        </div>
        <div className={style.row} style={{ justifyContent: "end" }}>
          <p>
            Don't have a account <Link to="/register">Register here</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
