class Rating {
    constructor(object){
        console.log("RATINGS OBJECT", object)

        this.gif_id = object.gif_id
        this.user_id = object.user_id
        this.rating = object.rating
    }
};
module.exports = Rating