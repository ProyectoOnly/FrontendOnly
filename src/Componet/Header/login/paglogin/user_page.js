import React, { useState, useEffect } from "react";
/* import { UserContext } from "../../context/UserContext";
import { useContext } from "react"; */
import { Link } from "react-router-dom";
import axios from "axios";
import "./user_page.css";

const User = () => {
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

  const [userProducts, setuserProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/movies/profile/${userIdLocal}`)
      .then(function (response) {
        setuserProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const imagelook = (product) => {
    const lookImage = [];
    for (let i = 0; i < product.image.length; i++) {
      lookImage.push(product.image[i].Url);
    }

    return (
      <div className="divImagen">
        <img className="imgproducts" src={lookImage[0]} alt={"images"} />
      </div>
    );
  };

  if (!userIdLocal) {
    return <div>Cargando usuario</div>;
  }
  return (
    <div className="User_page">
      <div className="divuser_page">
        <div>
          <img className="umageUSer" src={infoUser.images} />
        </div>

        <div>
          <h1>¡Hola, {infoUser.name}!</h1>
          <h2>Tus Productos</h2>
          <h3>
            Aquí podrás subir productos, gestionar los que ya tienes y
            destacarlos para venderlos antes
          </h3>
        </div>
      </div>

      <div>
        <div className=" bodyHome">
          <div className="card">
            {userProducts.map((product, index) => {
              return (
                <div className="divGeneralProducts">
                  <Link className="link" to={`/movies/${product._id}/`}>
                    <div>
                      <div className="flip-card">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <div>{product.title}</div>
                            {imagelook(product)}
                          </div>
                          <div className="flip-card-back">
                            <div>{product.title}</div>
                            <div className="text-card">
                              <br />
                              <div>Time: {product.time}</div>
                              <br />
                              <div>description: {product.description}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
