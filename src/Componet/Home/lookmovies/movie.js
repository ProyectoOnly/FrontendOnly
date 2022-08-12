import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Movie = () => {
  const params = useParams();
  const [MoviesCard, setMoviesCard] = useState([]);
  const [UserProd, setUserPro] = useState([]);
  const Token = window.localStorage.getItem("Token");
  const userIdLocal = window.localStorage.getItem("UserId");
  console.log("datauser", UserProd);

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
      });
  };
   const buton = () => {

     if (UserProd.likesProduct.includes(params.productId)) {
      console.log("fjncion 1");
      return (
        <button className="dislikes" onClick={clikLikes}>
          ♡
        </button>
      );
    } else {
      console.log("fjncion 2");
      return (
        <button className="likes" onClick={clikLikes}>
          ♥
        </button>
      );
    } 
  }; 


  return (
    <div>
      <div className=" bodyHome">
        <div className="card">
          <div className="card_contenido">
            <div className="card_imagen">
            <img src={MoviesCard.images} />
              {MoviesCard.images}
           </div>
            <div className=" cards_Tilte">
              {MoviesCard.title},{MoviesCard.id}
            </div>
            <div className=" card_SubTilte">
              <div>Marca: {MoviesCard.gender}</div>
              <div>Precio: {MoviesCard.time}</div>
            </div>
            <div className="card_Description">
              <div>{MoviesCard.date} </div>
              <div>{MoviesCard.description} </div>
              <div>{MoviesCard.actor} </div>
              <div>{MoviesCard.director} </div>
            </div>
            <div className="buttonlikes">
     {/*       {buton()}  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
