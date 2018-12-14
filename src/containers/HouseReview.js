import React from 'react'
import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadReview, getReviewIsFinished } from '../actions/reviewsActions'
import ReviewItem from '../components/ReviewItem'
import Rating from '../components/Rating'
import { ChevronRight }  from 'react-feather';
import styles from '../styles/style.scss';

class HouseReview extends React.Component {
    render() {
        const { reviews, users, houseId } = this.props;
        const review = reviews.data[houseId];
        return (
            <div className="HouseReview__container">
              <h3>Review</h3>
              <div className="HouseReview__review_overview">
                <Rating star={review.averageRating} size={18}/>
                <a href="#reviews" className="HouseReview__review_link">{reviews.length} Reviews <ChevronRight color={styles.grey}/></a>
              </div>
              <div className="HouseReview__review_list">
                  {
                    !reviews.isLoading && 
                    review.contents.map(review => (
                        <ReviewItem key={`review-${review.id}`} review={review} user={users[review.authorId]}/>
                    ))
                  }
              </div>
            </div>
          );
    }
}

const mapStateToProps = ({ reviews, users }) => ({
    reviews,
    users,
})

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
    loadReview: id => loadReview(id),
    getReviewIsFinished: getReviewIsFinished,
    goBack: goBack,
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseReview)