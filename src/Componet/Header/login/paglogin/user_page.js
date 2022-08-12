import React, { useState, useEffect } from "react";
/* import { UserContext } from "../../context/UserContext";
import { useContext } from "react"; */
import { Link } from "react-router-dom";
import axios from "axios";

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
      .get(`${process.env.REACT_APP_BACK_URL}/products/profile/${userIdLocal}`)
      .then(function (response) {
        setuserProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(userProducts);

  if (!userIdLocal) {
    return <div>Cargando usuario</div>;
  }
  return (
    <>
      <h1>¡Hola, {infoUser.name}!</h1>
      <img src={infoUser.images} />
      <h2>Tus Productos</h2>
      <h3>
        Aquí podrás subir productos, gestionar los que ya tienes y destacarlos
        para venderlos antes
      </h3>
      {userProducts.map((product, index) => {
        return (
          <div key={product._id}>
            <div>
              <div>
                {product.name},<br></br>
                {product.brand},<br></br>
                {product.price} €<br></br>
                <img src={product.images} />
              </div>
            </div>
          </div>
        );
      })}
      <Link to="/addProduct">
        <button className="productButton">Subir Producto</button>
      </Link>
    </>
  );
};

export default User;
