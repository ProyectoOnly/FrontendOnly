import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
    
  return (
    <div>
    <div className=" bodyHome">
      <div className="card">
        {products.map((product, index) => {
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
  );
};

export default CategoryPage;
