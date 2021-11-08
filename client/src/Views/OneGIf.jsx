import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Gif from '../../../server/models/gif.model';
import axios from 'axios';
import { useParams } from 'react-router';

const OneGIf = (props) => {
    const {id} = useParams()
    const [gif, setGif] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/gifs/"+id)
        .then(res =>{
            setGif(res.data)
        })
    })
    return (
        <div className="feed-wrapper home-wrapper">
            < Gif 
            gif={gif}
            />
        </div>
    );
};

OneGIf.propTypes = {};

export default OneGIf;