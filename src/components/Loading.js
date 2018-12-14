import React from 'react';
import loadingImage from '../images/loading.gif';

export default () => (
    <div className="Loading__container">
        <img src={loadingImage} alt="loading" width="100"/>
    </div>
)