import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import Search from "./Search/Search";
import "./header.css";
import axios from "axios";

const Header = () => {
  let location = useLocation();
  
  const { user, logout } = useContext(UserContext);
  const [infoUser, setInfoUser] = useState([]);
 
  const userIdLocal = window.localStorage.getItem("UserId");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/users/${userIdLocal}`)
      .then((response) => {
        console.log(response);
        setInfoUser(response.data);
      });
  }, []);

  const buttonChange = () => {
    if (!user) {
      return (
        <button className="loginButton">
          <Link to="login"> SignUp or Login </Link>
        </button>
      );
    } else {
      
      if (location.pathname === "/users") {
        return (
          <div className="ButtonProfile">
            <div className="dropdown">
              <button className="dropbtn">{infoUser.name}</button>
              <div className="dropdown-content">
                <button className="loginButton">
                  <Link to="updateuser"> EDITAR PERFIL </Link>
                </button>
                <button className="loginButton" onClick={logout}>
                  <Link to="/"> CERRAR SESION </Link>
                </button>
                <button className="loginButton">
                  <Link to="/addmovie">AGREGAR_MOVIE </Link>
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        
        return (
          <div className="ButtonProfile">
            <div className="dropdown">
              <button class="dropbtn">
                <Link className="link-logo" to="users">
                  <div>
                    {infoUser.images.length > 0 ? (
                      <img className="img-logo" src={infoUser.images[0]} />
                    ) : (
                      <img className="img-logo" src={'https://res.cloudinary.com/privateonlywork/image/upload/v1660006728/cld-sample.jpg'} />
                    )}
                  </div>
                  <div>{infoUser.name}</div>
                </Link>
              </button>
              <div class="dropdown-content">
                <button className="loginButton" onClick={logout}>
                  <Link to="/"> CERRAR SESION </Link>
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="principal_header">
      <div className="header_part">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/privateonlywork/image/upload/v1660007801/category/lob_egqy6w.jpg"
            alt="Logo"
            className="logoButton"
          />
        </Link>
      </div>
      <div className="header_part">
        <h1>Wolf Time</h1>
        <Search />
      </div>
      <div className="header_part">
        <div>{buttonChange()}</div>
      </div>
    </div>
  );
};

export default Header;
