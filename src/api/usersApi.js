class UsersApi {
    static getUser(id) {
        return fetch(`https://dome.now.sh/api/users/${id}`).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
}
  
export default UsersApi;  