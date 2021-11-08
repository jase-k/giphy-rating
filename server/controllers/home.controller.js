const { response } = require("express");
const User = require("../models/user.model");
const UserController = require("./user.controller")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: axios } = require("axios");
const MySQLConnection = require("../config/mysql.config")

module.exports.login = async (req, res) => {
        let params = {
            type: "read",
            table: "users", 
            options: {
                email : req.body.email
            }
        }
        //Find user by email.. else throw error -> email not found
        MySQLConnection.db_query(params)
        .then(results => {
            let user = results[0]
            if(user === undefined) {
                // email not found in users collection
                return res.status(400).json({message: "Couldn't find user email!"})
            }
        
            // if we made it this far, we found a user with this email address
            // let's compare the supplied password to the hashed password in the database
            bcrypt.compare(req.body.password, user.password)
            .then(correctPassword => {
                if(!correctPassword) {
                    // password wasn't a match!
                    return res.status(400).json({message: "Passwords Don't Match"});
                }
            
                // if we made it this far, the password was correct
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
            
                // note that the response object allows chained calls to cookie and json
                res
                    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(error => {
                res.status(400).json({message: "Login Failed", error: error})
            })
        })
        .catch(error => res.status(400).json({error: error})) 
    }

module.exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body)
    .then(user => {
        //Creates cookie and assigns it to user for future validation
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY)
        
        res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true})
        .json({message: "success!", user: user})
    })
    } catch (err) {
        res.status(400).json({message: "Registration Failed", error: err})
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200)
}