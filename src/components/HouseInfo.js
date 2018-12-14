import React from 'react';
import LikeButton from './LikeButton';
import { ChevronLeft, MessageSquare } from 'react-feather';
import styles from '../styles/style.scss'

export default ({house, user, onModalClick, onBack}) => (
    <div>
        <div className="HouseInfo__image" style={{backgroundImage: `url("${house.photos[0]}")`}}>
            <div className="Action__back" onClick={onBack}>
                <ChevronLeft color={styles.grey}/>
            </div>
            <LikeButton houseId={house.id}/>
        </div>
        <div className="HouseInfo__container">
            <h1 className="HouseInfo__name">{house.name}</h1>
            <div className="HouseInfo__roominfo">
                <div>{house.rooms} Rooms</div>
                <div>{house.size} Sq m</div>
                <div>{house.windows} Windows</div>
            </div>
            <div className="HouseInfo__ownerinfo">
                <div className="HouseInfo__ownerimg">
                    <img src={house.photos[0]} alt={house.name} width="40" height="40"/>
                </div>
                <div className="HouseInfo__ownerprofile">
                    <h2>{user.name}</h2>
                    <span>{user.address}</span>
                </div>
                <div className="HouseInfo__comment" onClick={onModalClick}>
                    <MessageSquare color="white"/>
                </div>
            </div>
            <div className="HouseInfo__condition">
                <h3>condition</h3>
                <p>{house.condition}</p>
            </div>
        </div>
    </div>
);