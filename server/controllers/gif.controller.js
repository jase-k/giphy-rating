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
                gifArray.push(new Gif(gifs.data.data[i], [], []))
            }
            resolve({data: gifArray})
        })
        .catch(err => resolve({ message: "Something went wrong", error: err }));
    }).then(data => res.json(data)).catch(err => res.status(400).json({error:err}))
};

module.exports.getGif = (req, res) => {
    return new Promise((resolve, reject) => {
        let url = `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${process.env.GIPHY_API_KEY}`
        axios.get(url)
        .then(results => {

            let gifResult = results.data.data
            addCommentsAndRatings(gifResult)
            .then(gif => res.json(gif))
            .catch(error => res.status(400).json({error:error}))
        })
        .catch(err => {
            resolve({ message: "Something went wrong", error: err })
        });
    }).then(data => res.json(data)).catch(err => res.status(400).json({error:err}))
};

module.exports.searchGifs = (req, res) => {
    return new Promise((resolve, reject) => {
        let searchterm = req.query.q
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchterm}&limit=10`
        axios.get(url)
        .then(gifs => {
            let gifArray = []
            for(let i = 0; i < gifs.data.data.length; i++){
                gifArray.push(new Gif(gifs.data.data[i], [], []))
            }
            resolve({data: gifArray})
        })
        .catch(err => resolve({ message: "Something went wrong", error: err }));
    }).then(data => res.json(data)).catch(err => res.status(400).json({error:"error"}))
}

//Adds comments and ratings to gif object
async function addCommentsAndRatings(gif){
    return new Promise((resolve, reject) =>{
        //sets parameters for sql query see ../config/mysql.confis.js
        let params = {
            type:"read", 
            table:"comments", 
            options: {
                gif_id: gif.id
            }, 
            join: {
                table: "users", 
                on: "users.id", 
                from: "user_id"
            },
            aliases: {
                "comments.id": "comment_id"
            }
        }

        MySQLConnection.db_query(params)
        .then((comments) =>{
            let commentsArray = []
            for(let i = 0; i < comments.length; i++){
                commentsArray.push(comments[i])
            }
            let params = {
                type:"read", 
                table:"ratings", 
                options: {
                    gif_id: gif.id
                }, 
                join: {
                    table: "users", 
                    on: "users.id", 
                    from: "user_id"
                },
                aliases: {
                    "ratings.id": "rating_id"
                }
            }
            MySQLConnection.db_query(params)
            .then((ratings) =>{
                let ratingsArray = []
                for(let i = 0; i < ratings.length; i++){
                    ratingsArray.push(ratings[i])
                }
                
                let oneGif = new Gif(gif, commentsArray, ratingsArray)
                resolve(oneGif)
            })
            .catch(err => {
                reject({message: "Something went wrong with ratings", error: err})
            })
        })
        .catch(err =>{
            reject({message: "Something went wrong with comments", error: err})
        })
    })
}


