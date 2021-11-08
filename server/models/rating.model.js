class Rating {
    constructor(object){
        console.log("RATINGS OBJECT", object)

        this.gif_id = object.gif_id
        this.user_id = object.user_id
        this.rating = object.rating
        object.username ? this.username = object.username : "unknown"
        object.rating_id ? this.id = object.rating_id : ""
    }
};

module.exports = Rating