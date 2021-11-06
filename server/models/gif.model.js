class Gif {
    constructor(object){
        this.id = object.id
        this.url = object.url
        this.embed_url = object.embed_url
        this.source = object.source
        this.username = object.username
        this.rating = object.rating
        object.user !== undefined ? this.display_name = object.user.display_name : this.display_name = null
    }
};
module.exports = Gif
// const gif = {
//     "type":"gif",
//     "id":"GfjXRhR4Kg7c0OPfMc",
//     "url":"https://giphy.com/gifs/mlb-sports-baseball-jorge-soler-GfjXRhR4Kg7c0OPfMc",
//     "slug":"mlb-sports-baseball-jorge-soler-GfjXRhR4Kg7c0OPfMc",
//     "bitly_gif_url":"https://gph.is/g/a98gQ75",
//     "bitly_url":"https://gph.is/g/a98gQ75",
//     "embed_url":"https://giphy.com/embed/GfjXRhR4Kg7c0OPfMc",
//     "username":"mlb",
//     "source":"http://mlb.com",
//     "title":"Atlanta Braves Reaction GIF by MLB",
//     "rating":"g",
//     "content_url":"",
//     "source_tld":"mlb.com",
//     "source_post_url":"http://mlb.com",
//     "is_sticker":0,
//     "import_datetime":"2021-10-31 03:54:48",
//     "trending_datetime":"2021-11-06 01:00:03",
//     "user":{"avatar_url":"https://media4.giphy.com/avatars/mlb/UTAk9uV8rZw2.jpg",
    //     "banner_image":"https://media4.giphy.com/channel_assets/mlb/8Y39J0Q4HSYL.gif",
    //     "banner_url":"https://media4.giphy.com/channel_assets/mlb/8Y39J0Q4HSYL.gif",
    //     "profile_url":"https://giphy.com/mlb/",
    //     "username":"mlb",
    //     "display_name":"MLB",
    //     "description":"Every GIF from every game of MLB! Find and share all of your favorite moments!",
    //     "instagram_url":"https://instagram.com/mlb",
    //     "website_url":"http://mlb.com",
    //     "is_verified":true
        //},
//     "analytics_response_payload":"e=Z2lmX2lkPUdmalhSaFI0S2c3YzBPUGZNYyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9NGJjZDMzMTZ0MnV4bDloa2V6YnQzdDE4dHl4Y2JwOTNzODV5ZWwzY2E0dG5wMGkxJmN0PWc",
//     "analytics":{"onload":{"url":"https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUdmalhSaFI0S2c3YzBPUGZNYyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9NGJjZDMzMTZ0MnV4bDloa2V6YnQzdDE4dHl4Y2JwOTNzODV5ZWwzY2E0dG5wMGkxJmN0PWc&action_type=SEEN"},
//     "onclick":{"url":"https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUdmalhSaFI0S2c3YzBPUGZNYyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9NGJjZDMzMTZ0MnV4bDloa2V6YnQzdDE4dHl4Y2JwOTNzODV5ZWwzY2E0dG5wMGkxJmN0PWc&action_type=CLICK"},
//     "onsent":{"url":"https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPUdmalhSaFI0S2c3YzBPUGZNYyZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9NGJjZDMzMTZ0MnV4bDloa2V6YnQzdDE4dHl4Y2JwOTNzODV5ZWwzY2E0dG5wMGkxJmN0PWc&action_type=SENT"}}
// }