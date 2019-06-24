//https://github.com/react-boilerplate/react-boilerplate/blob/master/app/utils/request.js
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
// function parseJSON(response) {
//   if (response.status === 204 || response.status === 205) {
//     return null;
//   }
//
//   console.log('response', response);
//   return response.json();
// }
function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  // return fetch(url, options)
  //   .then(checkStatus)
  //   .then(parseJSON);

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response.json.error);
      })
      .catch((error) => Promise.reject(error));
  })
}
