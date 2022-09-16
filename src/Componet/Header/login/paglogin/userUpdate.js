import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const initInfo = {
  name: "",
  surname1: "",
  surname2: "",
  email: "",
};
const UpdateUser = ({ setpicture }) => {

  const [files, setfiles] = useState(null);
  const navigate = useNavigate();
  const userIdLocal = window.localStorage.getItem("UserId");
  const Token = window.localStorage.getItem("Token");
  const [userInfo, setUserInfo] = useState([]);
  const [inputInfo, setInputInfo] = useState(initInfo);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/users/${userIdLocal}`)
      .then((response) => {
        setUserInfo(response.data);
        });
  }, []);

  const EditUser = async () => {
    const customHeaders = {
      Authorization: Token,
    };

    axios
      .patch(
        `${process.env.REACT_APP_BACK_URL}/users/${userIdLocal}`,
        inputInfo,
        {
          headers: customHeaders,
        }
      )
      .then(function (response) {
       
        console.log("success");
        setUserInfo(inputInfo);
         window.location.reload();
        navigate("/users");
        });
  };

  const handlerChangeForm = (field) => (e) =>
    setInputInfo({ ...inputInfo, [field]: e.target.value });

  const PostImage = (e) => {
    setfiles(e);
  };
  const InsertImage = async () => {
    const f = new FormData();

    for (let index = 0; index < files.length; index++) {
      f.append("photos", files[index]);
    }
    await axios
      .post(`${process.env.REACT_APP_BACK_URL}/users/${userIdLocal}/images`, f)
      .then((response) => {
        setUserInfo(response.data);
        setpicture(response.data.images[0]);
        setTimeout(() => {}, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="containerAdd">
        <div>
          <input
            type="file"
            name="files"
            multiple
            onChange={(e) => PostImage(e.target.files)}
          ></input>
        </div>
        <div>
          <label>
            <button className="button-size" onClick={InsertImage}>
              Actualizar imagen
            </button>
          </label>

          <h1>Formulario Editar</h1>
        </div>
        <div className="product-box">
          <label>Nombre</label>

          <input
            type="text"
            value={inputInfo.name}
            onChange={handlerChangeForm("name")}
          />
        </div>
        <div className="product-box">
          <label>Apellido 1</label>

          <input
            type="text"
            value={inputInfo.surname1}
            onChange={handlerChangeForm("surname1")}
          />
        </div>
        <div className="product-box">
          <label>Apellido 2</label>

          <input
            type="text"
            value={inputInfo.surname2}
            onChange={handlerChangeForm("surname2")}
          />
        </div>
        <div className="product-box">
          <label>E-mail</label>

          <input
            type="email"
            value={inputInfo.email}
            onChange={handlerChangeForm("email")}
          />
        </div>
        <div>
          <button className="button-size" onClick={EditUser}>
            Actualizar
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
