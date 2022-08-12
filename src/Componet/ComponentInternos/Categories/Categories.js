import React from "react";
import Category from "./Category/Category";
import { useState, useEffect } from 'react';

const Categories = () => {
    const [showCategory, setCategories] = useState([]);
    const [basePath, setBasePath] = useState([])
    const getCategories = async function() {
        const categoriesInfo = await fetch(`${process.env.REACT_APP_BACK_URL}/category`);
        const parsedInfo = await categoriesInfo.json();
        setCategories(parsedInfo.data);
        setBasePath(parsedInfo.basePath);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="categories">
        {showCategory.map((category, index) => {
            return(
                <div className="category" key={index}>
                <Category name={category.name} products={category.products} description={category.description} id={category._id} basePath={basePath} icon={category.url}/>
                </div>)
        } )}
        </div>
    );
};

export default Categories;