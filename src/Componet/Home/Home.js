import React from 'react';
import Categories from '../ComponentInternos/Categories/Categories';
import MovieVisual from './lookmovies/visualmovie';
import "./home.css"

const Home = () => {
    return (
        <div className='home'>
            <div>
                 <Categories />
            </div>
            <div>
                 <MovieVisual/>
            </div>
               
              
        </div>
    );
};

export default Home;