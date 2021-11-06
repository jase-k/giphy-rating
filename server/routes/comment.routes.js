const CommentController = require("../controllers/comment.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.post("/api/comments/new", CommentController.createNewComment);
    app.delete("/api/comments/delete/", CommentController.deleteComment);
    app.put("/api/comments/update/", CommentController.updateComment);
    app.get("/api/comments/:id", CommentController.findOneComment);
    //Sample Crud Routes:
//   app.get("/api/comments/", authenticate, CommentController.findAllComments);
};