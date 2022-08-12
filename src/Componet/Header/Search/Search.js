    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import { Link } from "react-router-dom";
    import "./search.css"

    const Search = () => {
    const [searchData, setSearchData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    
    const cleanForm = () => {
        setFilteredResults([]);
        setSearchInput("")
        document.getElementById("search").value = ""
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/movies`).then((response) => {
        setSearchData(response.data);
        cleanForm()
        });
        }, []);
    
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);   
        if (searchInput !== "") {
        const filteredData = searchData.filter((item) => {
            return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setFilteredResults(filteredData);
        } else {
        setFilteredResults(searchData);
        } 
    
    };
     
    return (
        <div className="boxSearch">
        <div className="container-1">
            <input
            type="search"
            id="search"
            placeholder="  Search..."
            onChange={(e) => searchItems(e.target.value)}
                    />
            <div className="filtroBusqueda">
            {searchInput.length > 0
                ? filteredResults.map((movie, index) => {
                    return (
                    <ul className="ResposSearch" key={index}>
                        <Link className="link" to={`/movies/${movie._id}/`} onClick={cleanForm}>
                        <td>
                            <p>{movie.title}</p>
                        </td>
                        </Link>
                    </ul>
                    );
                })
                : false}
            </div>
            
        </div>   
        </div>
    );
    };
    export default Search;
