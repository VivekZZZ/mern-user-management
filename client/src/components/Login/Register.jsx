import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "../home.module.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (error || success) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [error, success]);

  const formHandle = (e) => {
    e.preventDefault();
    let payload = {
      name,
      email,
      phone,
      password,
    };
    // ------------------------------ Response from backend is not coming      -----------------------------------------------
    axios
      .post("http://localhost:3001/registerAdmin", payload)
      .then((res) => {
        // console.log(res);
        if (res.data === "FAIL") {
          setError("Email Id Already Exist");
        } else {
          setSuccess("Registered SuccessFully");
          setName("");
          setEmail("");
          setPassword("");
          setPhone("");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        // setError(err.response.data.message);
      });
  };

  return (
    <div id={style.form}>
      <form>
        <h1> Register Here ....</h1>
        {success && (
          <p
            style={{
              color: "green",
              fontSize: "16px",
              textAlign: "center",
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
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
        <div className={style.row}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
          <label htmlFor="">Phone</label>
          <input
            type="text"
            placeholder="Enter Phone"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
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
          <button onClick={formHandle}>REGISTER</button>
        </div>
        <div className={style.row} style={{ justifyContent: "end" }}>
          <p>
            Already Registered <Link to="/">Login here</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
