import 'whatwg-fetch';


export const getJSON = (path) => {
    return fetch(config.api_url + path, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('escalatorToken')
      }
    }).then((response) => {
      return response.json();
    });
};
