const bcrypt = require("bcrypt")
class User {
	constructor(object){
		this.giphy_id = object.giphy_id
		this.username = object.username
		this.email = object.email
		this.password = object.password
	}
	static validate(object){ //returns object {status,  message}
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
	hashpw(){
		bcrypt.hash(this.password, 14, (err, hash) =>{
			this.password = hash
			console.log(this.password)
			return
		})
	}
}
module.exports = User

// const UserSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: [true, "name is required"],
// 		minlength: [6, "First name must be at least 6 characters long"],
// 	},
// 	email: {
// 		type: String, 
// 		required: [true, "Email is required!"],
// 		validate: {
// 			validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
// 			message: "Please enter a valid email"
// 		}
// 	},
// 	password: {
// 		type: String,
// 		required: [true, "Password is required"],
// 		minlength: [8, "Password must be 8 characters or longer"]
// 	}
// }, {timestamps: true});

// //PreHook creates a virtual attribute for model but will not save to the db
// UserSchema.virtual('confirmPassword') //name of virtual attribute
// 	.get(() => this._confirmPassword)
// 	.set(value => this._confirmPassword = value)

// //PreHook checks for validations prior to all other validations defined in the model
// UserSchema.pre('validate', function(next){
// 	if(this.password !== this.confirmPassword){
// 		this.invalidate('confirmPassword', 'Password must match confirm password');
// 	}
// 	next()
// })

// //PreHook prior to saving data to db. 
// UserSchema.pre('save', function(next){
// 	bcrypt.hash(this.password, 14)
// 	.then(hash => {
// 		this.password = hash;
// 		next();
// 	});
// });

// const OldUser = mongoose.model("User", UserSchema);

// module.exports = OldUser;