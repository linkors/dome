class ReviewsApi {
    static getReview(id) {
        return fetch(`https://dome.now.sh/api/reviews/${id}`).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
}
  
export default ReviewsApi;  