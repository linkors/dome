import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  changeSearchQuery
} from '../actions/queryActions'
import { SORT_BY_PRICE_ASC, SORT_BY_PRICE_DESC, SORT_BY_RATING_ASC, SORT_BY_RATING_DESC } from '../constants/sortBy'
import { loadHouses } from '../actions/homesActions';
import HeaderSearch from '../components/HeaderSearch'
import HouseItem from '../components/HouseItem'
import Loading from '../components/Loading'
import StarFilter from './StarFilter'
import SortList from './SortList'


const filterVisibleData = (houses, reviews, starFilter) => {
  return houses.filter(item => {
    if (reviews.data[item.id] && 
        starFilter.length &&
        !starFilter.includes(reviews.data[item.id].averageRating)) {
      return false;
    }
    return true;
  })
}

const sortVisibleData = (houses, reviews, sortBy) => {
  switch (sortBy) {
    case SORT_BY_PRICE_ASC:
      return houses.sort(function (a, b) {
        return a.price - b.price;
      })
    case SORT_BY_PRICE_DESC:
      return houses.sort(function (a, b) {
        return b.price - a.price;
      })
    case SORT_BY_RATING_ASC:
      return houses.sort(function (a, b) {
        return reviews.data[a.id].averageRating - reviews.data[b.id].averageRating;
      })
    case SORT_BY_RATING_DESC:
      return houses.sort(function (a, b) {
        return reviews.data[b.id].averageRating - reviews.data[a.id].averageRating;
      })
    default:
      return houses;
  }

}

class SearchForm extends React.Component {

    constructor (props) {
        super(props);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillMount() {
      const { match } = this.props;
      if (match.params.query) {
        this.onSearchChange(match.params.query)
      }
    }

    componentDidMount() {
      const { loadHouses, match } = this.props;
      loadHouses(match.params.query);
    }

    onSearchClick (e) {
      e.preventDefault();
      this.searchHouse.call(this);
    }

    onSearchChange (value) {
        this.props.onSearchChange(value);
    }

    onInputChange(e) {
      this.onSearchChange(e.target.value);
    }

    searchHouse() {
      const {searchQuery, changeQuery, loadHouses} = this.props;
      loadHouses(searchQuery);
      changeQuery(searchQuery);
    }

    render() {
        const { houses, searchQuery, gotoDetail, reviews, users } = this.props;
        const { visibleData, executionTime, isLoading, starFilter, sortBy } = houses;
        let listHouses = filterVisibleData(visibleData, reviews, starFilter);
        listHouses = sortVisibleData(listHouses, reviews, sortBy);
        return ( 
            <div>
                <HeaderSearch 
                  onClick={this.onSearchClick} 
                  onInputChange={this.onInputChange}
                  query={searchQuery}
                  totalResult={visibleData.length}
                  executionTime={executionTime}
                />
              {
                isLoading ? 
                (
                <Loading/>
                ) 
                :
              listHouses.map(item => (
                <HouseItem 
                  key={item.id} 
                  house={item} 
                  user={users[item.ownerId]}
                  rating={reviews.data[item.id] ? reviews.data[item.id].averageRating : 0}
                  onClick={() => gotoDetail(item.id)}
                />
              ))
              }
              <div className="Search__actions">
                <StarFilter/>
                <SortList/>
              </div>
            </div>
        )
    }
}

const mapStateToProps = ({ searchQuery, houses, reviews, users }) => ({
    searchQuery,
    houses,
    reviews,
    users,
})

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
    onSearchChange: changeSearchQuery,
    loadHouses: query => loadHouses(query),
    // searchHouse: query => searchHouse(query),
    changeQuery: query => push(`/search/${query}`),
    gotoDetail: id => push(`/detail/${id}`),
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
