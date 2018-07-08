import { SHORTENVY_POST, SHORTENVY_SUCCESS, SHORTENVY_FAILURE } from '../constants';

export const sendUrl = longUrl => ({
  type: SHORTENVY_POST,
  longUrl,
  error: '',
  shortUrl: '',
  msg: ''
});

// Gist from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const postData = (url = ``, data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
};

export default function shortenUrl(longUrl) {
  const API_URL = 'http://shortenvyurl.azurewebsites.net/api/shorten';
  return dispatch => {
    dispatch(sendUrl(longUrl));
    postData(API_URL, {
      longUrl: longUrl
    })
      .then(response => {
        console.log('response:: ' + JSON.stringify(response));
        dispatch({
          type: SHORTENVY_SUCCESS,
          longUrl: response.longUrl,
          shortUrl: response.shortUrl,
          error: response.error,
          msg: response.msg
        });
      })
      .catch(response => {
        dispatch({
          type: SHORTENVY_FAILURE,
          longUrl: '',
          shortUrl: '',
          error: '',
          msg: ''
        });
      });
  };
}
