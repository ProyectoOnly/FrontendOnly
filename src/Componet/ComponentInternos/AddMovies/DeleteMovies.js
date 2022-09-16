import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteMovies = () => {
  const Token = window.localStorage.getItem("Token");
  const params = useParams();
  const navigate = useNavigate();

  const [deleProduct, setDeleteProduct] = useState();

  const deleteProduct = () => {
    axios
      .delete(`${process.env.REACT_APP_BACK_URL}/movies/${params.productId}`, {
        headers: { Authorization: Token },
      })
      .then(function (response) {
        console.log("success");
        setTimeout(() => {
          console.log("redirect");
        }, 2000);
        navigate("/users");
        setDeleteProduct(response.data);
      });
  };

  return (
   
      <button className="dropbtn" onClick={deleteProduct}>
       <div>
        <h12> Delete</h12>
        
       </div>
       
      </button>
   
  );
};

export default DeleteMovies;
