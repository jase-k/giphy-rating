import React from 'react';
import { useState } from 'react';
import "./login.css"

const Login = (props) => {
    const [user, setUser] = useState({})


    const handleChange = (e) =>{
        const {value, name} = e.target
        setUser({
                ...user,
                [name]:value
            })
    }
    return (
        <div className="sign-in-background">
            <div className="sign-in-wrapper">
                <div className="purple-blob">
                    <p className="p1"></p>
                    <p className="p2"></p>
                    <p className="p3"></p>
                </div>
                <div className="sign-in-char"><p>&#xbb;</p></div>
                <div className="sign-in-form-wrapper">
                    <h3>Welcome <br /> Back</h3>
                    <form onSubmit={(e) => props.handleSubmit(e, user)}>
                        <input type="email" name="email" id="email" onChange={(e)=>{handleChange(e)}} value={user.email} placeholder="email"/>
                        <input type="password" name="password" id="password" onChange={(e)=>{handleChange(e)}} value={user.password} placeholder="password" />
                        <div className="submit"><label htmlFor="sign-in">Sign in</label> <button>&#x2192;</button></div>
                    </form>
                    <button className="sign-up-link" onClick={(e) => {props.setIsNewUser(true)}}> Sign Up </button>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {};

export default Login;