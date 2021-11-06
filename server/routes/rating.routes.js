const RatingController = require("../controllers/rating.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.post("/api/ratings/new", RatingController.createNewRating);
    app.delete("/api/ratings/delete/", RatingController.deleteRating);
    app.put("/api/ratings/update/", RatingController.updateRating);
    app.get("/api/ratings/:id", RatingController.findOneRating);
    //Sample Crud Routes:
//   app.get("/api/ratings/", authenticate, RatingController.findAllRatings);
};