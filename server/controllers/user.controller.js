const MySQLConnection = require("../config/mysql.config")
const { default: axios } = require("axios");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt")

module.exports.index = (req, res) => {
  res.json({
    message: "You are Connected to the DB"
  })
}
module.exports.findAllUsers = (req, res) => {
  User.find()
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};


module.exports.createNewUser = (req, res) => {
  let userObject = req.body
  console.log(userObject)
  let validMessage = User.validate(userObject)
  if(validMessage.status == "error"){
    res.status(400).json({error: validMessage.message})
  }
  axios.get("https://api.giphy.com/v1/randomid?api_key="+process.env.GIPHY_API_KEY)
  .then(results => {
    userObject.giphy_id = results.data.data.random_id
    console.log(results.data.data)
    let user = new User(userObject) 
    bcrypt.hash(user.password, 12)
    .then(hash => {
      console.log(user)
      user.password = hash     
      let params = {
          table: "users",
          type: "create",
          values: user
      }
      console.log(params)
      MySQLConnection.db_query(params)
      .then(results => {
        const userToken = jwt.sign({
          id: user._id
          }, process.env.SECRET_KEY)
        console.log({id: results})
        
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
};

module.exports.updateUser = (req, res) => {
let user = new User(req.body) 
console.log(user)     
let params = {
  table: "users",
  type: "update",
  values: user,
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
module.exports.deleteUser = (req, res) => {
// console.log(req)
  let params = {
      table: "users",
      type: "delete",
      options: {
          id: req.body.id
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
    console.log(response)
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
    console.log(response)
    res.status(400).json({error: response})
  })

}