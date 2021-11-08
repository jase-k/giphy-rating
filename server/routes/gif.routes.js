const GifController = require("../controllers/gif.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
  //limits to top 50 gifs
  app.get("/api/gifs/trending", authenticate, GifController.getTrendingGifs);
  //Limits to top 10 gifs. 
  app.get("/api/gifs/search", authenticate, GifController.searchGifs);
  app.get("/api/gifs/:id", authenticate, GifController.getGif);
};