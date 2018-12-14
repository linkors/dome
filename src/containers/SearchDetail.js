import React from 'react'
import HouseInfo from '../components/HouseInfo'
import HouseReview from '../containers/HouseReview'
import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadHouse } from '../actions/activeHouseActions'
import { getReviewStart } from '../actions/reviewsActions'
import CommentModal from '../components/CommentModal';
import Loading from '../components/Loading';
import Storage from '../utils/Storage';

class SearchDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false
        }
        this.onModalClose = this.onModalClose.bind(this);
        this.openModal = this.openModal.bind(this);
    }
    componentWillMount() {
        this.props.getReviewStart();
    }
    async componentDidMount() {
        const { match, loadHouse } = this.props;
        await loadHouse(match.params.id);
    }

    onModalClose(draft) {
        this.setState({ modalShown: false });
        Storage.setDraftComment(draft);
    }

    openModal() {
        this.setState({ modalShown: true });
    }

    render() {
        const { modalShown } = this.state;
        const { activeHouse, reviews, users, goBack } = this.props;
        const { data:house } = activeHouse;
        const user = users[house.ownerId];
        return (
            <div className="SearchDetail__container">
              { house.id >= 0 && !reviews.isLoading ? (
                <div>
                    <HouseInfo house={house} user={user} onModalClick={this.openModal} onBack={goBack}/>
                    <HouseReview houseId={house.id}/>
                    <CommentModal isShown={modalShown} onClose={this.onModalClose} user={user}/>
                </div>
              ) : 
              (
                  <Loading/>
              )}
            </div>
          );
    }
}

const mapStateToProps = ({ activeHouse, reviews, users }) => ({
    activeHouse,
    reviews, 
    users,
})

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
    loadHouse: id => loadHouse(id),
    getReviewStart: getReviewStart,
    goBack: goBack,
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetail)