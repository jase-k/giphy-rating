import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Rating = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(props.rating.rating)
    useEffect(() =>{
        setValue(props.rating.rating)
        setIsEditing(false)
    }, [props])
    const handleSettingIsEditing = () => {
        if(isEditing === true){
            let body = {
                gif_id: props.gifId,
                user_id: props.userId,
                rating: value,
                id: props.rating.id
            }
            axios.put("http://localhost:8000/api/ratings/update", body, {withCredentials:true})
            .then(res => {
                console.log(res.data)
                setIsEditing(!isEditing)
            })
        }
        else{
            setIsEditing(true)
        }
    }

    return (
        <div className="rating-wrapper">
            <input type="num" 
            value={value} 
            onChange={(e) => {setValue(e.target.value)}} 
            className="rating-input"
            readOnly={
                isEditing ? false: true
            }
            />
            <p className="user-rating">-{props.rating.username}</p>
            {
                props.rating.user_id === props.userId ?
                        <button className="edit"
                        onClick={()=>{handleSettingIsEditing()}}
                        >
                        {isEditing ? "save": "edit?"}
                        </button>
                        :""
            }
            {
                isEditing ? <button onClick={(e) => {props.handleDelete(e, 'ratings', props.rating.id)}}>delete</button>
                : ""
            }
        </div>
    );
};

Rating.propTypes = {};

export default Rating;