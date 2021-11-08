import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';

const Gif = (props) => {
    const nav = useNavigate();
    const {id} = useParams()

    return (
        <div className="gif-container">
            <p className="gif-header">Gif by: {props.gif.display_name}</p>
            <img 
            src={props.gif.downsized_url} 
            alt={props.gif.display_name+" gif"} 
            className = "gif"
            />
            <div className="gif-footer"> 
                <img src={process.env.PUBLIC_URL+"/star.png"} alt="rating"
                onClick={() => {nav(`/gifs/${props.gif.id}/rate`)}}
                />
                <img src={process.env.PUBLIC_URL+"/comment.png"} alt="comment" 
                onClick={() => {nav(`/gifs/${props.gif.id}/comment`)}}
                />
            </div>
        </div>
    );
}

Gif.propTypes = {};

export default Gif;