import React from 'react';
import "./search.css"

const Search = (props) => {

    return (
        <div class="search-container">
            <input type="text" placeholder="Search..." onChange={(e) => {props.setSearchTerm(e.target.value)}} />
            <div class="search"></div>
        </div>
    );
};

Search.propTypes = {};

export default Search;