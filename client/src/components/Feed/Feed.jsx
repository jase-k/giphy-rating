import React, { useState } from 'react';
import Gif from './Gif/Gif';
import "./feed.css"

const Feed = (props) => {
    const [isCustom, setIsCustom] = useState(false) //determines if trending or search term
    
    return (
        <div className="feed-wrapper">
            <p>
            {
                isCustom ? "Search Results for: "+props.searchTerm : "Trending Gifs"
            }
            </p>
            {/* Gif Containers -> Active or Not State */}
            {
                props.gifList.map((gif, idx)=>{
                    return(
                        <Gif gif={gif} key={idx}/>
                    )
                })
            }
        </div>
    );
};

Feed.propTypes = {};

export default Feed;