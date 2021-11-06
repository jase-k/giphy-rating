const  Gif  = require("../models/gif.model");
const axios = require("axios");
const MySQLConnection = require("../config/mysql.config")
const { response } = require("express");

module.exports.getTrendingGifs = (req, res) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`)
        .then(gifs => {
            let gifArray = []
            for(let i = 0; i < gifs.data.data.length; i++){
                gifArray.push(new Gif(gifs.data.data[i]))
            }
            resolve({data: gifArray})
        })
        .catch(err => resolve({ message: "Something went wrong", error: err }));
    }).then(data => res.json({data: data})).catch(err => res.status(400).json({error:err}))
};


