class HouseApi {  
    static getAllHouses() {
      return fetch('https://dome.now.sh/api/houses').then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
    static getHouse(id) {
        return fetch(`https://dome.now.sh/api/houses/${id}`).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
}
  
export default HouseApi;  