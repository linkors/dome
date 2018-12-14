import React from 'react';
import Rating from './Rating';
import LikeButton from '../components/LikeButton';
import { toDollar } from '../utils/Formatter';

export default class HouseItem extends React.Component {
    render() {
        const { house, rating, user, onClick} = this.props;

        return (
            <div onClick={onClick} className="HouseItem__container">
                <img src={ house.photos[0] } className="HouseItem__img" alt={house.name}></img>
                <strong className="HouseItem__name">{ house.name }</strong>
                <div className="HouseItem__like">
                <LikeButton houseId={house.id}/>
                </div>
                <div className="HouseItem__description">
                    <div>
                        <div className="HouseItem__address">
                            { user ? user.address : '-' }
                        </div>
                        <div className="HouseItem__rating">
                            <Rating star={rating}></Rating>
                        </div>
                    </div>
                    <div className="HouseItem__price">
                        { toDollar(house.price) }
                    </div>
                </div>
            </div>
        );
    }
} 