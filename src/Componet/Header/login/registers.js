import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const initInfo = {
  name: "",
  surname1: "",
  surname2: "",
  email: "",
  password: "",
  photos: [],
};

const Register = () => {
  const [registerUser, setNewRegisterUser] = useState(false);
  const [isError, setIsError] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [inputInfo, setInputInfo] = useState(initInfo);
  //inputInfo es la informacion nueva añadida que sustituye a initInfo
  const addUser = () => {
    const form_user = new FormData();

    for (const field in inputInfo) {
      form_user.append(field, inputInfo[field]);
    }

    for (const photo of inputInfo.photos) {
      form_user.append("photos", photo);
    }


    axios
      .post(`${process.env.REACT_APP_BACK_URL}/users/register`, form_user)

      .then(function (response) {
        console.log("success");
        setNewRegisterUser(true);
        setInputInfo(initInfo);
        setTimeout(() => {
          console.log("redirect");
        }, 2000);
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

  React.useEffect(() => {
    setDisabledButton(
      !(
        Object.values(inputInfo).every((field) => field.length) &&
        inputInfo.email.includes("@")
      )
    );
  }, [inputInfo]);

  const handlerChangeForm = (field) => (e) =>
    setInputInfo({ ...inputInfo, [field]: e.target.value });
   
   const handlerChangeImage = (e) =>
    setInputInfo({ ...inputInfo, photos: e.target.files });

  return (
    <>
      <div className="register-box">
        <h1>Pagina de Registro</h1>
        <div className="user-box">
          <label> Nombre </label>
          <input
            type="text"
            value={inputInfo.name}
            onChange={handlerChangeForm("name")}
          />
        </div>
        <div className="user-box">
          <label> Primer apellido </label>
          <input
            type="text"
            value={inputInfo.surname1}
            onChange={handlerChangeForm("surname1")}
          />
        </div>
        <div className="user-box">
          <label> Segundo Apellido </label>
          <input
            type="text"
            value={inputInfo.surname2}
            onChange={handlerChangeForm("surname2")}
          />
        </div>
        <div className="user-box">
          <label> E-mail </label>
          <input
            type="email"
            value={inputInfo.email}
            onChange={handlerChangeForm("email")}
          />
        </div>
        <div className="user-box">
          <label> Contraseña </label>
          <input
            type="password"
            value={inputInfo.password}
            onChange={handlerChangeForm("password")}
          />
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
        <div className="button-box">
            <Link to= "/login">  <button className="button-size" onClick={addUser} /* disabled={disabledButton} */>
            CREAR USUARIO
          </button>   
          </Link>
         
        </div>
        {registerUser && <p className="p_success">Tu cuenta ha sido creada</p>}
      {isError && <p className="p_error">Ha ocurrido un error</p>}
 
      </div>
      
      <br/>
         </>
  );
};

export default Register;
