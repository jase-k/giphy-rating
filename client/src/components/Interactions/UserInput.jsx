import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserInput = (props) => {
    const [value, setValue] = useState();

    return (
        <form onSubmit={(e)=>{props.handleSubmit(e, value)}}>
            <label htmlFor={props.type}>Leaving a {props.type}:</label>
            {
                props.type === "comment" ?
                <input
                type="text" 
                name={props.type} 
                id={props.type}
                onChange={(e)=>{setValue(e.target.value)}} 
                value={value}/>
                :<select name={props.type}
                onChange={(e)=>{setValue(e.target.value)}} 
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            }
            
            <button>Submit</button>
        </form>
    );
};

UserInput.propTypes = {};

export default UserInput;