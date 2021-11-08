import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./search.css"

const Search = (props) => {
    const [active, setActive] = useState()

    return (
        <div class="search-container">
            <input type="text" placeholder="Search..." />
            <div class="search"></div>
        </div>
    );
};

Search.propTypes = {};

export default Search;