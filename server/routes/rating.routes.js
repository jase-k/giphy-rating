const RatingController = require("../controllers/rating.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.post("/api/ratings/new", authenticate, RatingController.createNewRating);
    app.delete("/api/ratings/delete/", authenticate, RatingController.deleteRating);
    app.put("/api/ratings/update/", authenticate, RatingController.updateRating);
    app.get("/api/ratings/:id", authenticate, RatingController.findOneRating);
    //Sample Crud Routes:
//   app.get("/api/ratings/", authenticate, RatingController.findAllRatings);
};