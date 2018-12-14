import React from 'react';
import Storage from '../utils/Storage';
import { Heart } from 'react-feather';

export default class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        const { houseId } = this.props;
        this.toggleLike = this.toggleLike.bind(this);
        this.state = {
            isLiked: Storage.isHouseLiked(houseId)
        }
    }
    toggleLike(e) {
        e.stopPropagation();
        const { houseId } = this.props;
        Storage.toggleLike(houseId);
        this.setState({
            isLiked : !this.state.isLiked
        })
    }
    render() {
        return (
                <div className={'LikeButton_bg ' + (this.state.isLiked ? 'LikeButton__liked': '' )} onClick={this.toggleLike}>
                    <Heart color="white" size={14}/>
                </div>
        )
    }
}