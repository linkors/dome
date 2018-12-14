import { combineReducers } from 'redux'
import searchQuery from './searchQuery'
import houses from './houses'
import activeHouse from './activeHouse'
import reviews from './reviews'
import users from './users'

export default combineReducers({
  searchQuery,
  houses,
  activeHouse,
  reviews,
  users
})
