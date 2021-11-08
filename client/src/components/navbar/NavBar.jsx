import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import "./navbar.css"


const NavBar = (props) => {
    return (
        <div className="navbar">
            <button onClick={props.handleLogout} className = "logout">Logout</button>
            < Search setSearchTerm={props.setSearchTerm}/>
        </div>
    );
};

NavBar.propTypes = {};

export default NavBar;