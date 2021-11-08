const Rating = require('./rating.model')
const Comment = require('./comment.model')
class Gif {
    constructor(object, commentsArray=[], ratingsArray=[]){
        this.id = object.id
        this.original_url = object.images.original.url
        this.downsized_url = object.images.downsized.url
        this.source = object.source
        this.username = object.username
        this.rating = object.rating
        object.user !== undefined ? this.display_name = object.user.display_name : this.display_name = null
        this.comments = []
        for(let i = 0; i < commentsArray.length; i++){
            this.comments.push(new Comment(commentsArray[i]))
        }
        this.ratings = []
        for(let i = 0; i < ratingsArray.length; i++){
            this.ratings.push(new Rating(ratingsArray[i]))
        }
    }
};
module.exports = Gif
