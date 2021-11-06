const MySQLConnection = require("../config/mysql.config")
const { default: axios } = require("axios");
const User = require("../models/user.model");

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
  axios.get("https://api.giphy.com/v1/randomid?api_key="+process.env.GIPHY_API_KEY)
  .then(results => {
    userObject.giphy_id = results.data.data.random_id
    console.log(results.data.data)
    let user = new User(userObject) 
    console.log(user)     
    let params = {
        table: "users",
        type: "create",
        values: user
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
  })
  .catch()
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