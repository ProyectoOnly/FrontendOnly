import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import "./moives.css";
import DeleteMovies from "../../ComponentInternos/AddMovies/DeleteMovies";
import Comentary from "../comentary/cometary";

const Movie = () => {
  //poneer delete y like
  const params = useParams();
  const [MoviesCard, setMoviesCard] = useState([]);
  const [UserProd, setUserPro] = useState();
  const Token = window.localStorage.getItem("Token");
  const userIdLocal = window.localStorage.getItem("UserId");
  const [infoUser, setInfoUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/movies/${params.productId}`)
      .then((response) => {
        setMoviesCard(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/users/${userIdLocal}`)
      .then((response) => {
        setUserPro(response.data);
      });
  }, []);

  const buttons = () => {
    const clikLikes = async () => {
      console.log("clikc");
      await axios
        .post(
          `${process.env.REACT_APP_BACK_URL}/users/updatelikes`,
          { productId: params.productId },
          {
            headers: { Authorization: Token },
          }
        )
        .then((response) => {
          setUserPro(response.data);
          window.location.reload()
        });
    };

    if (!UserProd) {
      return <div></div>;
    }

    if (UserProd !== undefined) {
      if (UserProd.likesProduct.includes(params.productId)) {
        return (
          <div className="divIcons-container">
            <div className="divIcon">
              {/* <img
                className="icon"
                src="../../../../public/corazon likes.png"
                alt={"like"}
                onClick={clikLikes}
              /> */}
              <button className="butonlike" onClick={clikLikes}>♥</button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="divIcons-container">
            <div className="divIcon">
              {/*  <img
                className="icon"
                src="FrontendOnly\public\corazon dislikes.jpg"
                alt={"dislike"}
                onClick={clikLikes}
              /> */}
              <button  className="butonlike" onClick={clikLikes}>♡</button>
            </div>
          </div>
        );
      }
    }
  };

  const buttonSelector = () => {
    if (!UserProd) {
      return <div></div>;
    } else {
      return (
        <div >
          {UserProd.products.includes(params.productId) ? (
              <div className="ButtonProfile">
            <div className="dropdown">
              <button className="dropbtn">Selector</button>

              <div className="dropdown-content">
                <button className="loginButton">
                  <DeleteMovies />
                </button>
                <button className="loginButton">
                  <Link to={`updatemovies`}>
                    <button className="dropbtn">Actualizar</button>
                  </Link>
                </button>
              </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  };

  if (!MoviesCard) {
    return <div></div>;
  }

  return (
    <div>
      <div className="product">
        <div className="product__photo">
          <div className="photo-container">
            <div className="photo-main">
              <img src={MoviesCard.images} alt={"images"} />
            </div>
          </div>
        </div>
        <div className="product__info">
          <div className="title">
            <div>{MoviesCard.title}</div>
          </div>
          <div className="price">
            <div>Duración: {MoviesCard.time}</div>
          </div>
          <div className="description">
            <div>Actor: {MoviesCard.actor}</div>
            <div>Director: {MoviesCard.director}</div>
            <div>Fecha: {MoviesCard.date}</div>
            <div>Info: {MoviesCard.description}</div>
          </div>
          <div>{buttons()}</div>
          <div> {buttonSelector()} </div>
        </div>
        <div></div>
      </div>
      <Comentary />
    </div>
  );
};

export default Movie;
