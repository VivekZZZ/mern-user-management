import React from "react";
import style from "./home.module.css";
import { Link } from "react-router-dom";
// import img from "./images/broken-removebg.png"
import img from "./images/—Pngtree—site 404 error page_3407766.png";

const Error = () => {
  return (
    <div id={style.errorpage}>
      <div className={style.content}>
        <h2>Destination Unknown !!!</h2>
        <p>
          The requested <b>URL/{}</b> was not found on
          <br /> this server. <span>That's all we know</span>
        </p>
        <Link to="/">
          <button>Take me Home</button>
        </Link>
      </div>
      <div className={style.img}>
        <img src={img} alt="broken page" />
      </div>
    </div>
  );
};

export default Error;
