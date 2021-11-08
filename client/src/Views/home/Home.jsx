import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/navbar/NavBar';
import "./home.css"
import Feed from '../../components/Feed/Feed';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OneGIf from '../OneGIf';
import { API_URL } from '../..';
import { useNavigate } from 'react-router';

const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState();
    const [gifList, setGifList] = useState([]);
    const [interaction, setInteraction ] = useState(props.interaction)

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/gifs/trending", {withCredentials:true})
        .then(res => {
            console.log(res.data)
            setGifList([...res.data.data])
        })
    }, []);
    useEffect(() => {
        axios.get("http://localhost:8000/api/gifs/search?q="+searchTerm, {withCredentials:true})
        .then(res => {
            console.log(res.data)
            setGifList([...res.data.data])
        })
    }, [searchTerm])

    useEffect(() =>{
        setInteraction(props.interaction)
    }, [props])

    const handleLogout = ()=>{
        console.log("logging out")
        axios.get(API_URL+"/logout", {withCredentials: true}).then(res => {
            console.log(res)
            navigate('/')
        })
    }

    const handleSetSearchTermChange = (value) =>{
        setSearchTerm(value)
        setInteraction("trending")
    }

    return (
        <div className="home-wrapper">
            {/* NavBar -> search */}
            < NavBar handleLogout={handleLogout} setSearchTerm={handleSetSearchTermChange} />
            {
                interaction === "trending" ?
                    < Feed gifList={gifList} />
                    : interaction === "comment" ?
                        < OneGIf interaction="comment" userId={props.userId}/> 
                        : < OneGIf interaction="rating" userId={props.userId} />
            }
        </div>
    );
};

Home.propTypes = {};

export default Home;