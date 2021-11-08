const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const GifController = require("./server/controllers/gif.controller")
const RatingController = require("./server/controllers/rating.controller")
// GifController.getTrendingGifs().then(res => console.log(res));
// RatingController.createNewRating({user_id: 001, gif_id: 001, rating: 4})
// This will fire our mongoose.connect statement to initialize our database connection
// require("./server/config/mongoose.config");
require("./server/config/mysql.config")

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'})) //Change to client's http address
app.use(express.json(), express.urlencoded({ extended: true }));

// This is where we import the users routes function from our user.routes.js file
const UserRoutes = require("./server/routes/user.routes");
UserRoutes(app);
const RatingRoutes = require("./server/routes/rating.routes")
RatingRoutes(app)
const CommentRoutes = require("./server/routes/comment.routes")
CommentRoutes(app)
const GifRoutes = require("./server/routes/gif.routes")
GifRoutes(app)

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
