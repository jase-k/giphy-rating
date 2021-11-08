const MySQLConnection = require("../config/mysql.config")
const { response, query } = require("express");
const Rating = require("../models/rating.model");

module.exports.createNewRating = (req, res) => {
        let rating = new Rating(req.body) 
        console.log(rating)     
        let params = {
            table: "ratings",
            type: "create",
            values: rating
        }
        console.log(params)
        MySQLConnection.db_query(params)
        .then(results => {
            console.log({id: results})
            res.json({id: results})
        })
        .catch(response => {
            console.log(response)
            res.status(400).json({error: response})
        })
};

module.exports.updateRating = (req, res) => {
    let rating = new Rating(req.body) 
    console.log(rating)     
    let params = {
        table: "ratings",
        type: "update",
        values: rating,
        options: {
            id: req.body.id
        }
    }
    console.log(params)
    MySQLConnection.db_query(params)
    .then(results => {
        console.log({id: results})
        res.json({id: results})
    })
    .catch(response => {
        console.log(response)
        res.status(400).json({error: response})
    })
};
module.exports.deleteRating = (req, res) => {
    // console.log(req)
        let params = {
            table: "ratings",
            type: "delete",
            options: {
                id: req.params.id
            }
        }
        console.log(params)
        MySQLConnection.db_query(params)
        .then(results => {
            console.log({message: results})
            res.json({message: results})
        })
        .catch(response => {
            console.log(response)
            res.status(400).json({error: response})
        })
};

module.exports.findOneRating = (req, res) =>{
    let params = {
        table: "ratings",
        type: "read", 
        options: {
            id: req.params.id
        }
    }
    MySQLConnection.db_query(params)
    .then(results => {
        res.json({data: results})
    })
    .catch(response => {
        console.log(response)
        res.status(400).json({error: response})
    })
}

