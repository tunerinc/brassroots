'use strict';

/**
 * @module FetchRemoteURL
 */

/**
 * Function which fetches a url with a given response type
 * 
 * @async
 * @function fetchRemoteURL
 * 
 * @param    {string}  url  The url to fetch a resource from
 * @param    {string}  type The response type for the given url
 * 
 * @return   {Promise}
 * @resolves {object}       The response with the correct type retrieved from the url
 * @rejects  {Error}        The error which caused the failure
 */
function fetchRemoteURL(url, type) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status === 200) resolve(xhr.response);
    };

    xhr.send();
  });
}

module.exports = fetchRemoteURL;