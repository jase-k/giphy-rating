const bcrypt = require("bcrypt")

class User {
	constructor(object){
		this.giphy_id = object.giphy_id
		this.username = object.username
		this.email = object.email
		this.password = object.password
	}
	//returns object {status,  message}
	static validate(object){ 
		let status = "success"
		let message = ""
		if(object.password !== object.confirmPassword){
			status = "error"
			message = "Passwords must match"
		}
		if(object.username.length < 4){
			status = "error"
			message = "username must be at least 4 characters"
		}
		return {status: status, message: message}
	}
	//Hashes password
	hashpw(){
		bcrypt.hash(this.password, 14, (err, hash) =>{
			this.password = hash
			console.log(this.password)
			return
		})
	}
}
module.exports = User
