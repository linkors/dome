import React from 'react';
import { getDate, getTime } from '../utils/Formatter';
import Rating from './Rating';

export default ({review, user}) => (

    <div className="ReviewItem__container">
        <img src={user.avatar} alt={user.name}/>
        <div className="ReviewItem__review_content">
            <div className="ReviewItem__review_author">
             <strong>{user.name}</strong>   
             <span className="ReviewItem__time">{getTime(review.timestamp)}</span>
            </div>
            <div className="ReviewItem__date">
                {getDate(review.timestamp)}
            </div>
            <p className="ReviewItem__text">
                {review.text}
            </p>
            <div className="ReviewItem__rating">
                <Rating star={review.star}/>
            </div>
        </div>
       
    </div>
)