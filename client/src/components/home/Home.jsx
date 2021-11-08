import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../navbar/NavBar';
import "./home.css"
import Feed from '../Feed/Feed';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState();
    const [gifList, setGifList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/gifs/trending", {withCredentials:true})
        .then(res => {
            console.log(res.data)
            setGifList([...res.data.data])
        })
    }, []);

    return (
        <div className="home-wrapper">
            {/* NavBar -> search */}
            < NavBar handleLogout={props.handleLogout} />
            {/* The Feed -> gif -> gif expanded*/}
            < Feed searchTerm="Fish" gifList={gifList} />
        </div>
    );
};

Home.propTypes = {};

export default Home;