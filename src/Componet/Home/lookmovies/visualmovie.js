import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./visual_card.css";

const MovieVisual = () => {
  const [MoviesCard, setMoviesCard] = useState([]);
  const [numberofPages, setnumberofPages] = useState(1);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/movies/pages`)
      .then(function (response) {
        setnumberofPages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const getProductsbypage = function (Page) {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/movies/productsbypage/${Page}`)
      .then(function (response) {
        setMoviesCard(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductsbypage(Page);
  }, []);

  const pagenumbers = [];
  for (let i = 0; i < numberofPages; i++) {
    pagenumbers.push(i + 1);
  }

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
      <div >
        <div className="card">
          {MoviesCard.map((product, index) => {
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
      <div className="pageIcon">
        <ul className="ulIcon">
          {pagenumbers.map((number) => (
            <button className="pageBut">
              <a onClick={() => getProductsbypage(number)}>{number}</a>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieVisual;
