import React, { Fragment, useEffect } from "react";
import style from "./home.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  let [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((resp) => {
        setData(resp.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  let deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then((user) => {
        console.log(user);
        window.location.assign("/users");
      })
      .catch((err) => console.log(err));
  };

  // Calculate the indexes for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <div id={style.usersList}>
        {currentUsers.map((x) => {
          return (
            <div className={style.userCard} key={x._id}>
              <div className={style.userField}>
                <label>Name:</label>
                <p>{x.name}</p>
              </div>
              <div className={style.userField}>
                <label>Salary:</label>
                <p>{x.salary}</p>
              </div>
              <div className={style.userField}>
                <label>Company:</label>
                <p>{x.company}</p>
              </div>
              <div className={style.userBtn}>
                <button className={style.btn}>
                  <Link to={`/edituser/${x._id}`}>Edit</Link>
                </button>
                <button
                  className={`${style.btn} ${style.delete}`}
                  onClick={() => {
                    deleteUser(x._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.pagination}>
        {Array.from({ length: Math.ceil(data.length / usersPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? style.active : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </Fragment>
  );
};

export default Users;
