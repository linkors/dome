import React from 'react'
import { SORT_BY_PRICE_ASC, 
    SORT_BY_PRICE_DESC, 
    SORT_BY_RATING_ASC, 
    SORT_BY_RATING_DESC 
} from '../constants/sortBy'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    sortHouses
} from '../actions/homesActions'
import { AlignLeft } from 'react-feather';
import styles from '../styles/style.scss'

class SortList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isShown: false
        }
    }

    render() {
        const { sortHouses, houses } = this.props;
        
        const addClass = this.state.isShown ? 'shown' : '';

        return ( 
            <div className="SortList__container">
                <div className="SortList__button" onClick={() => this.setState({isShown : !this.state.isShown})}>
                    <AlignLeft color={styles.grey}/>
                    <span>Sort By</span>
                </div>
                <div className={ "SortList__popup " + addClass }>
                    <div 
                    className={ houses.sortBy === SORT_BY_RATING_ASC ? 'SortList__active': '' }
                    onClick={() => sortHouses(SORT_BY_RATING_ASC)}>
                        Rating - Lowest
                    </div>
                    <div
                    className={ houses.sortBy === SORT_BY_RATING_DESC ? 'SortList__active': '' } 
                    onClick={() => sortHouses(SORT_BY_RATING_DESC)}
                    >
                    Rating - Highest
                    </div>
                    <div 
                    className={ houses.sortBy === SORT_BY_PRICE_ASC ? 'SortList__active': '' } 
                    onClick={() => sortHouses(SORT_BY_PRICE_ASC)}>
                    Price - Lowest
                    </div>
                    <div 
                    className={ houses.sortBy === SORT_BY_PRICE_DESC ? 'SortList__active': '' } 
                    onClick={() => sortHouses(SORT_BY_PRICE_DESC)}>
                    Price - Highest
                    </div>
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
    sortHouses: (sortBy) => sortHouses(sortBy),
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortList)
