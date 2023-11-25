import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let [name, setName] = useState("");
  let [salary, setSalary] = useState("");
  let [company, setCompany] = useState("");

  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getUser/${id}`)
      .then((response) => {
        setName(response.data.name);
        setSalary(response.data.salary);
        setCompany(response.data.company);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [id]);

  let formHandle = (e) => {
    e.preventDefault();
    let payload = {
      name,
      salary,
      company,
    };
    axios
      .put(`http://localhost:3001/updateUser/${id}`, payload)
      .then(() => {
        console.log("Success");
        navigate("/users");
      })
      .catch(() => {
        console.log("Error in updating the data");
      });
  };

  return (
    <div id={style.form}>
      <form>
      <h1> Edit user ....</h1>
        <div className={style.row}>
        <label htmlFor="">Name</label>
        <input
          type="text"
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
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        /></div>
        <div className={style.row} style={{ justifyContent: "center" }}>
        <button onClick={formHandle}>UPDATE</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
