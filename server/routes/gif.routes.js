const GifController = require("../controllers/gif.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
  // app.get("/api", authenticate, GifController.index)
  app.get("/api/gifs/trending", GifController.getTrendingGifs);
  //Sample Crud Routes:
  // app.get("/api/gifs/:id", authenticate, GifController.findOneSingleGif);
  // app.put("/api/gifs/update/:id", authenticate, GifController.updateExistingGif);
  // app.post("/api/gifs/new", authenticate, GifController.createNewGif);
  // app.delete("/api/gifs/delete/:id", authenticate, GifController.deleteAnExistingGif);
};