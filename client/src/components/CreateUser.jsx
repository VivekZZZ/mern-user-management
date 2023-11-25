import React, { useState } from "react";

import style from "./home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
  let [name, setName] = useState("");
  let [salary, setSalary] = useState("");
  let [company, setCompany] = useState("");
  let navigate = useNavigate();

  let formHandle = (e) => {
    e.preventDefault();
    let payload = {
      name,
      salary,
      company,
    };
    axios
      .post("http://localhost:3001/createUser", payload)
      .then(() => {
        console.log("Data Posted");
        setName("");
        setSalary("");
        setCompany("");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/users");
  };

  return (
    <div id={style.form}>
      <form action="">
        <h1> Create New User ....</h1>
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
          <label htmlFor="">Salary</label>
          <input
            type="text"
            placeholder="Enter Salary"
            required
            value={salary}
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
        </div>
        <div className={style.row}>
          <label htmlFor="">Company</label>
          <input
            type="text"
            placeholder="Enter Company"
            required
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
        <div className={style.row} style={{ justifyContent: "center" }}>
          <button onClick={formHandle}>CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
