const CommentController = require("../controllers/comment.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    //Basic CRUD Routes
    app.post("/api/comments/new", authenticate, CommentController.createNewComment);
    app.delete("/api/comments/delete/:id", authenticate, CommentController.deleteComment);
    app.put("/api/comments/update/", authenticate, CommentController.updateComment);
    app.get("/api/comments/:id", authenticate, CommentController.findOneComment);
};