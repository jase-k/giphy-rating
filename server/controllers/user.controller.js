const MySQLConnection = require("../config/mysql.config")
const { default: axios } = require("axios");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt")

module.exports.createNewUser = (req, res) => {
  let userObject = req.body
  console.log(userObject)

  //Checks for user Validation 
  let validMessage = User.validate(userObject)
  if(validMessage.status == "error"){
    res.status(400).json({error: validMessage.message})
  }

  //Gets random id token from giphy to use for interactions to customize experience
  axios.get("https://api.giphy.com/v1/randomid?api_key="+process.env.GIPHY_API_KEY)
  .then(results => {
    userObject.giphy_id = results.data.data.random_id

    let user = new User(userObject) 
    bcrypt.hash(user.password, 12)
    .then(hash => {
      //Set parameters for MySQLConnection query
      user.password = hash     
      let params = {
          table: "users",
          type: "create",
          values: user
      }

      MySQLConnection.db_query(params)
      .then(results => {
        user.id = results

        //creates cookie for user validation
        const userToken = jwt.sign({
          id: results
          }, process.env.SECRET_KEY)

        res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true})
        .json({message: "success!", user: user})
      })
      .catch(response => {
          console.log(response)
          res.status(400).json({error: response})
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
  .catch(err => res.status(400).json({error: err}))
};

module.exports.updateUser = (req, res) => {
  let user = new User(req.body) 
  let params = {
    table: "users",
    type: "update",
    values: user,
    options: {
        id: req.body.id
    }
  }

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
module.exports.deleteUser = (req, res) => {
  let params = {
      table: "users",
      type: "delete",
      options: {
          id: req.body.id
      }
  }

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

module.exports.findOneUser = (req, res) =>{
  let params = {
    table: "users",
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
    res.status(400).json({error: response})
  })
}

module.exports.findOneUserByEmail = (req, res) => {
  let params = {
    table: "users",
    type: "read", 
    options: {
        email: req.params.email
    }
  }
  MySQLConnection.db_query(params)
  .then(results => {
    res.json({data: results})
  })
  .catch(response => {
    res.status(400).json({error: response})
  })

}