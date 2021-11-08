const MySQLConnection = require("../config/mysql.config")
const { response, query } = require("express");
const Comment = require("../models/comment.model");

module.exports.createNewComment = (req, res) => {
        let comment = new Comment(req.body) 
        console.log(comment)     
        let params = {
            table: "comments",
            type: "create",
            values: comment
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

module.exports.updateComment = (req, res) => {
    let comment = new Comment(req.body) 
    console.log(comment)     
    let params = {
        table: "comments",
        type: "update",
        values: comment,
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
module.exports.deleteComment = (req, res) => {
    // console.log(req)
        let params = {
            table: "comments",
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

module.exports.findOneComment = (req, res) =>{
    let params = {
        table: "comments",
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