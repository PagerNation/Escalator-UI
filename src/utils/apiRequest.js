import 'whatwg-fetch';

export const getJSON = (path) => {
    return fetch(config.api_url + path, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('escalatorToken')
      }
    })
    .then(checkStatus)
    .then((response) => {
      return response.json();
    });
};

export const postJSON = (path, body) => {
  return fetch(config.api_url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('escalatorToken')
    },
    body: JSON.stringify(body)
  })
  .then(checkStatus)
  .then((response) =>{
    return response.json();
  })
};

export const putJSON = (path, body) => {
  return fetch(config.api_url + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('escalatorToken')
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then((response) =>{
      return response.json();
    })
};

export const deleteObject = (path) => {
  return fetch(config.api_url + path, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('escalatorToken')
    }
  })
  .then(checkStatus)
  .then((response) => {
    return response.json();
  });
}


// =====================================

const checkStatus = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
