import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateMovies = () => {
  const Token = window.localStorage.getItem("Token");
  const params = useParams();
  const navigate = useNavigate();
  const [ProductCard, setProductCard] = useState([]);
  const [inputInfo, setInputInfo] = useState([]);

   useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/movies/${params.productId}`)
      .then((response) => {
        setProductCard(response.data);
      });
  }, []); 
  const updateProduct = () => {
      const customHeaders = {
      Authorization: Token,
     };
    
    axios
    .patch(
      `${process.env.REACT_APP_BACK_URL}/movies/${params.productId}`,
     inputInfo,
      {
        headers: customHeaders,
      }
    )
      .then(function (response) {
          navigate("/users");
           console.log("success");
         
          setProductCard(inputInfo);
          
          });
  };

  const handlerChangeForm = (field) => (e) =>
    setInputInfo({ ...inputInfo, [field]: e.target.value });

    return (
    <>
      <div className="containerAdd">
        <h1>Actualizar Productos</h1>
          <div className="product-box">
          <label>title</label>
          <input
            type="text"
            placeholder="sdad"
            value={inputInfo.title}
            onChange={handlerChangeForm("title")}
          />
        </div>
        <div className="product-box">
          <label>Genero</label>
          <input
            type="text"
            placeholder={ProductCard.time}
            value={inputInfo.gender}
            onChange={handlerChangeForm("gender")}
          />
        </div>
        <div className="product-box">
          <label>Tiempo</label>
          <input
            type="text"
            value={inputInfo.time}
            onChange={handlerChangeForm("time")}
          />
        </div>
        <div className="product-box">
          <label>descripcion</label>
          <input
            type="text"
            value={inputInfo.description}
            onChange={handlerChangeForm("description")}
          />
        </div>
        <div className="product-box">
          <label>Date </label>
          <input
            type="text"
            value={inputInfo.date}
            onChange={handlerChangeForm("date")}
          />
        </div>
        <div className="product-box">
          <label>Actor </label>
          <input
            type="text"
            value={inputInfo.actor}
            onChange={handlerChangeForm("actor")}
          />
        </div>
        <div className="product-box">
          <label>Director </label>
          <input
            type="text"
            value={inputInfo.director}
            onChange={handlerChangeForm("director")}
          />
        </div>
        <div>
          <button className="button-size" onClick={updateProduct}>
            Actualizar
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default UpdateMovies;
