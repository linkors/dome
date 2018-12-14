import React from 'react';
import { Star } from 'react-feather';
import styles from '../styles/style.scss'

export default ({star, size = 14}) => (
    <div className="Rating__container">
        { Array.from({ length: 5 }, (v, i) => (<Star key={i} size={size} color={i < star ? styles.green : styles.grey}/>))}
    </div>
)