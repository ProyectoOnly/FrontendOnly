import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Componet/Home/Home";
import Header from "./Componet/Header/Header";
import Footer from "./Componet/Footer/Footer";
import Register from "./Componet/Header/login/registers";
import Login from "./Componet/Header/login/login";
import User from "./Componet/Header/login/paglogin/user_page";
import Categories from "./Componet/ComponentInternos/Categories/Categories";
import CategoryPage from "./Componet/ComponentInternos/Categories/CategoryPage/CategoryPage";
import { UserContext } from "./context/UserContext";
import Movie from "./Componet/Home/lookmovies/movie";
import axios from "axios";
import AddMovie from "./Componet/ComponentInternos/AddMovies/AddMovie";
import UpdateUser from "./Componet/Header/login/paglogin/userUpdate";
import UpdateMovies from "./Componet/ComponentInternos/AddMovies/UpdateMovies";
import Comentary from "./Componet/Home/comentary/cometary";

function App() {


  const [user, setUser] = useState();
  const logout = () => {
    setUser();
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("UserId");
    /*     window.localStorage.setItem("UserId", null); */
  };

  const login = (user) => {
    window.localStorage.setItem("Token", user.token);
    window.localStorage.setItem("UserId", user.id);
    setUser(user);
  };

  console.log("user en la APP", user);

  if (user != null) {
    /*   console.log("no logueado") */
  }
  useEffect(() => {
    const Token = window.localStorage.getItem("UserId");
    console.log("token visualizacion", Token);

    axios
      .get(`${process.env.REACT_APP_BACK_URL}/users/${Token}`)
      .then((response) => {
        setUser(response.data);
        /*  console.log('esta es la response', response) */
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, logout }}>
    <BrowserRouter>
      <div className="principal-app">
        <div>
          <Header logout={logout}/>
        </div>
        <div className="app-home">
          <Routes>
          <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login setUser={login} />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="categories" element={<Categories />} />
            <Route exact path="users" element={<User />} />
            <Route exact path="/movies/:productId" element={<Movie/>} />
            <Route exact path="addmovie" element={<AddMovie/>} />
            <Route exact path="/movies/:productId/updatemovies" element={<UpdateMovies/>}/>
            <Route exact path="updateuser" element={<UpdateUser/>}/>
            <Route exact path="comentary" element={<Comentary/>}/>
            <Route
              exact
              path="/category/:categoryId"
              element={<CategoryPage />}
            />
          </Routes>
          
        </div>
        
      </div>
      <div className="principal-footer">
            <Footer />
          </div>
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
