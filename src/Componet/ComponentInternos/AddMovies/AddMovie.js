import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./addproduct.css"; 
import { Link, useNavigate } from "react-router-dom";

const initInfo = {
  title: "",
  gender: "",
  time: "",
  date: "",
  description: "",
  actor: "",
  director: "",
  photos: [],
};

const AddMovie = () => {
  const navigate = useNavigate();
  const Token = window.localStorage.getItem("Token");
  const [registerMovie, setNewRegisterMovie] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [disabledButton, setDisabledButton] = useState(true);
  const [inputInfo, setInputInfo] = useState(initInfo);
  const [category, setcategory] = useState([]);

  //Mostrar Categorías en barra y seleccionar la que queramos (Category ID)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/category`)
      .then((response) => {
       
        setcategory(response.data.data);
        /*  console.log("sadad",response.data.data) */
      });
  }, []);

  const addMovie = () => {
    const form = new FormData();

    for (const field in inputInfo) {
      form.append(field, inputInfo[field]);
    }

    for (const photo of inputInfo.photos) {
      form.append("photos", photo);
    }

    const customHeaders = {
      Authorization: Token,
      "Content-Type": "multipart/form-data",
    };

    axios
      .post(`${process.env.REACT_APP_BACK_URL}/movies`, form, {
        headers: customHeaders,
      })
      .then(function (response) {
        console.log("success");
         navigate("/users");
         setTimeout(() => {
          console.log("redirect");
        }, 2000);
       setNewRegisterMovie(true);
        setInputInfo(initInfo);
      })
      .catch(function (error) {
        console.log(error);
        setIsError(true);
        setInputInfo(initInfo);
      });
  };

  // const limitText = (e) => {
  //     const deny = /[!@#$·%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*/g;
  //     const changed = e.target.value.toLowerCase().replaceAll(deny, '');
  //     setInputInfo({...inputInfo, name: changed })
  // }
  //esto funciona

  const handlerChangeForm = (field) => (e) =>
    setInputInfo({ ...inputInfo, [field]: e.target.value });

  const handlerChangeImage = (e) =>
    setInputInfo({ ...inputInfo, photos: e.target.files });

  const handlerChangeSelect = (e) =>
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value });

  return (
    <>
      <div className="containerAdd">
        <h1>Añade tu producto</h1>
        <div className="product-box">
          <label> Titulo </label>
          <input
            type="text"
            value={inputInfo.title}
            onChange={handlerChangeForm("title")}
          />
        </div>
        <div className="product-box">
          <label>Actor</label>
          <input
            type="text"
            value={inputInfo.actor}
            onChange={handlerChangeForm("actor")}
          />
        </div>
        <div className="product-box">
          <label>Fecha</label>
          <input
            type="text"
            value={inputInfo.date}
            onChange={handlerChangeForm("date")}
          />
        </div>
        <div className="product-box">
          <label>Director</label>
          <input
            type="text"
            value={inputInfo.director}
            onChange={handlerChangeForm("director")}
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
          <label>Genero</label>
          <input
            type="text"
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
          <label>categorias </label>
          <select
            onChange={(e) => handlerChangeSelect(e)}
            name="categoryId"
            className="form-control"
          >
            <option>Selector Option</option>
            {category.length > 0
              ? category.map((element, index) => (
                  <option value={element._id} key={index}>
                    {element.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="subir-Id">
          <label id="XD" for="inputTag">
            Subir Imagen
          </label>{" "}
          <input
            id="inputTag"
            type="file"
            multiple
            onChange={(e) => handlerChangeImage(e)}
            accept="image/png, image/jpeg"
          />
        </div>
        <div>
          <button className="button-size" onClick={addMovie}>
            CREAR MOVIE
          </button>
        </div>

        {registerMovie && (
          <p className="p_success">Tu producto ha sido creado</p>
        )}
        {isError && <p className="p_error">Ha ocurrido un error</p>}
      </div>
      <br />
    </>
  );
};

export default AddMovie;
