class Comment {
    constructor(object){
        this.gif_id = object.gif_id
        this.user_id = object.user_id
        this.comment = object.comment
        object.username ? this.username = object.username : "unknown"
        object.comment_id ? this.id = object.comment_id : ""

    }
};
module.exports = Comment