import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Search } from 'react-feather';
import {
  changeSearchQuery
} from '../actions/queryActions'
import styles from '../styles/style.scss'

class SearchForm extends React.Component {

    constructor (props) {
        super(props);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchClick () {
        if (this.props.searchQuery)
            this.props.onSearchClick(this.props.searchQuery);
    }

    onSearchChange (e) {
        this.props.onSearchChange(e.target.value);
    }

    render() {
        const {searchQuery} = this.props;
        return ( 
            <form className="SearchForm__form" onSubmit={this.onSearchClick}>
                <input type="text" onChange={this.onSearchChange} placeholder="Find your dream home now..."></input>
                <div className={'SearchForm__search ' + (searchQuery ? '' : 'SearchForm__search_disabled')} onClick={this.onSearchClick}>
                    <Search color={searchQuery ? styles.green : styles.grey} size={16}/>
                </div>
            </form>
        )
    }
}

const mapStateToProps = ({ searchQuery }) => ({
    searchQuery
})

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
    onSearchChange: changeSearchQuery,
    onSearchClick: query => push(`/search/${query}`)
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
