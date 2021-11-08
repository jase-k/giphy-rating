import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Login from '../components/login/Login';
import { useNavigate } from 'react-router';
import { API_URL } from '..';
import Register from '../components/login/Register';
import Home from './home/Home';

const Index = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isNewUser, setIsNewUser] = useState(false)
    const navigate = useNavigate();
    
    
    
    const handleSubmit = (e, user) =>{

        e.preventDefault()
        if(isNewUser){
            axios.post(API_URL+"/api/users/new", {
                ...user
            }, {withCredentials:true})
            .then(res => {
                console.log(res)
                setIsLoggedIn(true)
                props.setUserId(res.data.user.id)
                navigate("/home")
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        else{
            axios.post(API_URL+"/login", {
                ...user
            }, {withCredentials:true})
            .then(res => {
                console.log(res)
                setIsLoggedIn(true)
                props.setUserId(res.data.user.id)
                navigate("/home")
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }
    const handleLogout = ()=>{
        console.log("logging out")
        axios.get(API_URL+"/logout", {withCredentials: true}).then(res => {
            console.log(res)
            setIsLoggedIn(false)
            navigate('/')
        })
    }
    return (
        <div>
            {
                isLoggedIn ?
                <Home handleLogout={handleLogout}/>
                : isNewUser ?
                    < Register 
                    handleSubmit= {(e, user) => handleSubmit(e, user)}
                    setIsNewUser= {setIsNewUser}
                    />
                    :< Login  
                    handleSubmit= {(e, user) => handleSubmit(e, user)}
                    setIsNewUser= {setIsNewUser}
                    isNewUser = {isNewUser}
                    />
            }
        </div>
    )
};

Index.propTypes = {};

export default Index;
