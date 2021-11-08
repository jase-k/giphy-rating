const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();

require("./server/config/mysql.config")

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'})) //Change to client's http address
app.use(express.json(), express.urlencoded({ extended: true }));

// Importing routes to be used in app
const UserRoutes = require("./server/routes/user.routes");
UserRoutes(app);
const RatingRoutes = require("./server/routes/rating.routes")
RatingRoutes(app)
const CommentRoutes = require("./server/routes/comment.routes")
CommentRoutes(app)
const GifRoutes = require("./server/routes/gif.routes")
GifRoutes(app)

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
