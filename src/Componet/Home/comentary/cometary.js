import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./comentry.css";

const initInfo = {
  description: "",
  image: "",
  photos: [],
};
const Comentary = () => {
  const Token = window.localStorage.getItem("Token");
  const userIdLocal = window.localStorage.getItem("UserId");
  const params = useParams();

  const [MoviesCard, setMoviesCard] = useState([]);
  const [registerMovie, setNewRegisterMovie] = useState(false);
  const [UserProd, setUserPro] = useState();
  const [inputInfo, setInputInfo] = useState(initInfo);

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
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/movies/${params.productId}`)
      .then((response) => {
        setMoviesCard(response.data);
      });
  }, []);
  const addComentary = () => {
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
      .post(
        `${process.env.REACT_APP_BACK_URL}/comentary/${params.productId}`,
        form,
        {
          headers: customHeaders,
        }
      )
      .then(function (response) {
        console.log("success");
        setNewRegisterMovie(true);
        setInputInfo(initInfo);
        setTimeout(() => {
          console.log("redirect");
          window.location.reload();
        }, 1000);
      });
  };

  const filtroComent = (MoviesCard) => {
    if (!MoviesCard) {
      return <div></div>;
    } else {
      if (!MoviesCard.length) {
        return <div></div>;
      } else {
        let arrComenta = [];
        for (let i = 0; i < MoviesCard.length; i++) {
          arrComenta.push(MoviesCard[i]);
        }

        return (
          <div className="forma-come" >
            {arrComenta.map((comente, index) => {
              return (
                <div className="divComi">
                  <div className="div-headercome">
                  
                      <div>
                        {comente.nameUser}
                      </div>
                      <div className="text-time">
                        {comente.time}
                      </div>
                    
                  </div>
                  <div className="div-bodycome">
                    <div>{comente.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }
  };

  const handlerChangeForm = (field) => (e) =>
    setInputInfo({ ...inputInfo, [field]: e.target.value });
  const handlerChangeImage = (e) =>
    setInputInfo({ ...inputInfo, photos: e.target.files });

  return (
    <div className="bodyComentary">
      <div className="product-box">
        <input
          className="inputComentary"
          placeholder="Comentario"
          type="text"
          value={inputInfo.description}
          onChange={handlerChangeForm("description")}
        />
      </div>
      <div className="BarraInput">
        <div>
          <button className="button-size" onClick={addComentary}>
            CREAR Coemntario
          </button>
        </div>
        <div className="subir-Id">
          <label id="XD" for="inputTag">
            Subir Imagen
          </label>{" "}
          <input
            className="img_input"
            type="file"
            multiple
            onChange={(e) => handlerChangeImage(e)}
            accept="image/png, image/jpeg"
          />
        </div>
      </div>

      <div className="card-comentary">{filtroComent(MoviesCard.comentary)}</div>
    </div>
  );
};
export default Comentary;
