const UserController = require("../controllers/user.controller");
const HomeController = require("../controllers/home.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
  //Routes to get authenticated (needed for all other routes)
  app.post("/login", HomeController.login)
  app.get("/logout", HomeController.logout)
  
  //Crud Routes:
  app.get("/api/users/:id", authenticate, UserController.findOneUser);
  app.put("/api/users/update/:id", authenticate, UserController.updateUser);
  app.post("/api/users/new", UserController.createNewUser);
  app.delete("/api/users/delete/:id", authenticate, UserController.deleteUser);
};