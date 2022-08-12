import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./categoryPage.css";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  const getMoviesByCategory = async function () {
    const categoryResponse = await fetch(
      `${process.env.REACT_APP_BACK_URL}/movies/category/${params.categoryId}`
    );
    const categoryProducts = await categoryResponse.json();
    setProducts(categoryProducts);
  };

  useEffect(() => {
    getMoviesByCategory();
  }, []);

  return (
    <>
      <h1>Categoría </h1>
      <h2> Productos de esta categoría:</h2>
      <div className="conta">
        {products.map((product) => {
          return (
            <div className="page">
              <div>
                {product.name}
                {product.price} €
                {/* <br></br>
                    <img src={`${process.env.REACT_APP_BACK_URL}${product.image}`} alt={"images"} /> */}
              </div>
              <br/>
            </div>
          );
        })}
      </div>
      
    </>
  );
};

export default CategoryPage;
