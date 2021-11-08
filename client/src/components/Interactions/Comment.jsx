import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './interactions.css'
import axios from 'axios';

const Comment = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(props.comment.comment)
    useEffect(() =>{
        setValue(props.comment.comment)
        setIsEditing(false)
    }, [props])
    const handleSettingIsEditing = () => {
        if(isEditing === true){
            let body = {
                gif_id: props.gifId,
                user_id: props.userId,
                comment: value,
                id: props.comment.id
            }
            axios.put("http://localhost:8000/api/comments/update", body, {withCredentials:true})
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
        <div className="comment-wrapper">
            <input value={value} 
            onChange={(e)=>{setValue(e.target.value)}} 
            className="comment-input"
            readOnly={
                isEditing ? false: true
            }
            />
            <p className="user-comment">-{props.comment.username}</p>
            {
                props.comment.user_id === props.userId ?
                        <button className="edit"
                        onClick={()=>{handleSettingIsEditing()}}
                        >
                        {isEditing ? "save": "edit?"}
                        </button>
                        :""
            }
            {
                isEditing ? <button onClick={(e) => {props.handleDelete(e, "comments", props.comment.id)}}>delete</button>
                : ""
            }
        </div>
    );
};

Comment.propTypes = {};

export default Comment;