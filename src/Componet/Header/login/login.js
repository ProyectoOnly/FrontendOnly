import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'

const initInfo = {
  email: "",
  password: "",
};

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, loginUser] = useState(false);

  const [isError, setIsError] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [inputInfo, setInputInfo] = useState(initInfo);

  const login = () => {
    axios
      .post(`${process.env.REACT_APP_BACK_URL}/users/login/`, inputInfo)

      .then(function (response) {
        if (response.data.token) {
          setInputInfo(initInfo);
          loginUser(true);

             console.log("esro es la respuesta login:",response.data); 
          
            setUser(response.data);
            navigate("/users");
            window.location.reload()
        
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsError(true);
        setInputInfo(initInfo);
      });
  };

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

  return (
    <>
    
    <div className="login-box">
      <div className="user-box">
        <label> E-MAIL </label>
        <input type="email" value={inputInfo.email} onChange={handlerChangeForm("email")}/>
        
      </div>
      <div className="user-box">
        <label> PASSWORD </label>
        <input type="password" value={inputInfo.password} onChange={handlerChangeForm("password")}/>
      </div>
      <div className="button-box">
         <button className="button-size" onClick={login} disabled={disabledButton}> Submit </button>
      </div>
      
       <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">
              <button className="button-size">SIGNUP</button>
            </Link>
          </span>
        </p> 
    </div>
    <br/>
     {user && <p className="p_error">Has iniciado sesion</p>}
     {isError && <p className="p_error">Ha ocurrido un error</p>}
    </>
  );
};

export default Login;
