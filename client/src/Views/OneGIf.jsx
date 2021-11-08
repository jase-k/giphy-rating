import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Gif from '../components/Feed/Gif/Gif'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Rating from '../components/Interactions/Rating';
import Comment from '../components/Interactions/Comment';
import UserInput from '../components/Interactions/UserInput';
import NavBar from '../components/navbar/NavBar';
import { API_URL } from '..';


const initialGifState = {
    comments: [],
    ratings: []
}

const OneGIf = (props) => {
    const {id} = useParams()
    const [gif, setGif] = useState(initialGifState);
    const [interactionCount, setInteractionCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/gifs/"+id, {withCredentials:true})
        .then(res =>{
            console.log(res.data)
            setGif(res.data)
        })
    }, [interactionCount])

    const handleSubmit = (e, value) => {
        e.preventDefault()
        if(props.interaction === "comment"){
            let body = {
                comment: value,
                user_id: props.userId,
                gif_id: gif.id
            }
            axios.post('http://localhost:8000/api/comments/new', body, {withCredentials:true})
            .then(res => {
                console.log(res)
                setInteractionCount(interactionCount+1)
            })
        }
        else{
            let body = {
                rating: value,
                user_id: props.userId,
                gif_id: gif.id
            }
            axios.post('http://localhost:8000/api/ratings/new', body, {withCredentials:true})
            .then(res => {
                console.log(res)
                setInteractionCount(interactionCount+1)
            })
        }
    }
    const handleDelete = (e, type, id) => {
        axios.delete(`http://localhost:8000/api/${type}/delete/${id}`, {withCredentials:true})
        .then(res =>{
            console.log(res)
            setInteractionCount(interactionCount+1)
        })
    }
    return (
        <div className="feed-wrapper home-wrapper">
            < Gif 
            gif={gif}
            />
            < UserInput 
            type={props.interaction} 
            handleSubmit={handleSubmit}
            />
            {
                props.interaction === "comment" ?
                    gif.comments.map((comment) =>{
                        return < Comment 
                                        comment={comment} 
                                        gifId={gif.id} 
                                        userId={props.userId}
                                        handleDelete={handleDelete}
                                        />
                    })
                    :gif.ratings.map((rating) =>{
                        return < Rating 
                                rating={rating} 
                                gifId={gif.id} 
                                userId={props.userId}
                                handleDelete={handleDelete}
                                />
                    })
            }
        </div>
    );
};

OneGIf.propTypes = {};

export default OneGIf;