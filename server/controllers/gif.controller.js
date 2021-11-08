const  Gif  = require("../models/gif.model");
const axios = require("axios");
const MySQLConnection = require("../config/mysql.config")
const { response } = require("express");
const Comment = require('../models/comment.model')
const Rating = require('../models/rating.model')

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
    }).then(data => res.json(data)).catch(err => res.status(400).json({error:err}))
};

module.exports.getGif = (req, res) => {
    return new Promise((resolve, reject) => {
        let url = `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${process.env.GIPHY_API_KEY}`
        // console.log(url)
        axios.get(url)
        .then(results => {
            console.log("RESULTS: ", results.data)
            MySQLConnection.db_query({type:"read", table:"comments", options: {gif_id: results.data.data.id}})
            .then((comments) =>{
                // console.log("COMMENTS FROM DB", comments)
                let commentsArray = []
                for(let i = 0; i < comments.length; i++){
                    console.log("COMMENT FROM DB", comments[i])
                    commentsArray.push(comments[i])
                }
                console.log("Results object after comments promise", results.data)
                MySQLConnection.db_query({type:"read", table:"ratings", options: {gif_id: results.data.data.id}})
                .then((ratings) =>{
                    console.log("ratings from db", ratings)
                    let ratingsArray = []
                    for(let i = 0; i < ratings.length; i++){
                        ratingsArray.push(ratings[i])
                    }
    
                    let oneGif = new Gif(results.data.data, commentsArray, ratingsArray)
                    resolve({data: oneGif})
                })
                .catch(err => {
                    resolve({message: "Something went wrong with ratings", error: err})
                })
            })
            .catch(err =>{
                resolve({message: "Something went wrong with comments", error: err})
            })
        })
        .catch(err => {
            console.log("Error: ", err)
            resolve({ message: "Something went wrong", error: err })
        });
    }).then(data => res.json(data)).catch(err => res.status(400).json({error:err}))
};


