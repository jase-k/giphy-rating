import React, {useState} from 'react';

const Register = (props) => {
    const [user, setUser] = useState({})


    const handleChange = (e) =>{
        const {value, name} = e.target
        setUser({
                ...user,
                [name]:value
            })
    }
    return (
        <div className="sign-in-wrapper">
            <div className="purple-blob">
                <p className="p1"></p>
                <p className="p2"></p>
                <p className="p3"></p>
            </div>
            <div className="sign-in-char"><p>&#xbb;</p></div>
            <div className="sign-in-form-wrapper">
                <h3>Create <br /> Account</h3>
                <form onSubmit={(e) => props.handleSubmit(e, user)}>
                    <input type="username" name="username" id="username" onChange={(e)=>{handleChange(e)}} value={user.username} placeholder="username"/>
                    <input type="email" name="email" id="email" onChange={(e)=>{handleChange(e)}} value={user.email} placeholder="email"/>
                    <input type="password" name="password" id="password" onChange={(e)=>{handleChange(e)}} value={user.password} placeholder="password" /> 
                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=>{handleChange(e)}} value={user.confirmPassword} placeholder="confirmPassword" /> 
                    <div className="submit"><label htmlFor="sign-in">Sign Up</label> <button>&#x2192;</button></div>
                </form>
                <button className="sign-up-link" onClick={(e) => {props.setIsNewUser(false)}}> Sign in </button>
            </div>
        </div>
    );
};

Register.propTypes = {};

export default Register;