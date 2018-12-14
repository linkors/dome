import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  addFilterHouseStar, removeFilterHouseStar
} from '../actions/homesActions'
import { Star, Check } from 'react-feather';
import Rating from '../components/Rating';
import styles from '../styles/style.scss';

class StarFilter extends React.Component {

    constructor (props) {
        super(props);
        this.toggleStar = this.toggleStar.bind(this);
        this.state = {
            isShown: false
        }
    }

    toggleStar (star) {
        const { houses, addFilterHouseStar, removeFilterHouseStar } = this.props;
        const { starFilter } = houses;
        if (starFilter.includes(star)) {
            removeFilterHouseStar(star);
        } else {
            addFilterHouseStar(star);
        }
    }

    render() {
        const { starFilter } = this.props.houses;
        const addClass = this.state.isShown ? 'shown' : '';

        return ( 
            <div className="StarFilter__container">
                <div className="StarFilter_button" onClick={() => this.setState({isShown : !this.state.isShown})}>
                    <Star color={styles.grey}/>
                    <span>Rating</span>
                </div>
                <div className={'StarFilter__popup ' + addClass}>
                    {
                        Array.from({length: 5}, (v, i) => {
                            const num = i + 1;
                            return (
                            <div key={i} className="StarFilter__item" onClick={() => this.toggleStar(num)}>
                                <div className={'StarFilter__checkbox ' + (starFilter.includes((num)) ? 'StarFilter__checked' : '')}>
                                    <Check color={starFilter.includes((num)) ? styles.white : styles.grey} size={14}/>
                                </div>
                                <div style={{width: '10px'}}></div>
                                <Rating star={num} size={18}/>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ houses }) => ({
    houses
})

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
    addFilterHouseStar: (star) => addFilterHouseStar(star),
    removeFilterHouseStar: (star) => removeFilterHouseStar(star)
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarFilter)
