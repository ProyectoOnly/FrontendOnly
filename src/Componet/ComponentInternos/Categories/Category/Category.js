import React from "react";
import { Link } from "react-router-dom";
import './category.css'

const Category = (props) => {
    return (
        
        <div className="container-category">
            <div>
                 <Link className="link" to={`/category/${props.id}`}>
            <div className="item-category">
            <img className="iconCategory" src={props.icon} alt={"icons"} />
            </div>
            <div className="item-name">
              {props.name}  
            </div>
            </Link>
            </div>
           
        </div>
        
    )
}
console.log(Category)

export default Category;