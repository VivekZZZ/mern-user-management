import React from "react";
import { Link } from "react-router-dom";
import style from "./home.module.css";
import { useAuth } from "../Auth/AuthContext";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div id={style.crud}>
      <div id={style.nav}>
        <Link to="/createUser">CREATE-USER</Link>
        <Link to="/users">USERS</Link>
        {isAuthenticated ? (
          <Link onClick={() => logout()}>LOGOUT</Link>
        ) : (
          <Link to="/">LOGIN</Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
