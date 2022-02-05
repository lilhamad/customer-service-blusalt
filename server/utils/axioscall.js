/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

import axios from 'axios';

/**
 * axiosCall requests for a specific Url and gives two output. 
 * {
 * url is compulsory
 * method should be either GET, POST, PATCH, PUT or DELETE. If method is not specified, it defaults to POST
 * headers is a json object. It is not compulsory as it defaults to { 'Content-Type': 'application/json'
 * timeout is not compulsory as it defaults to 60seconds.
 * data is a json object and it is not required in a get request
 * }
 *
 * @param {*} {
 *   url, method, headers, data, timeout,
 * }
 * @return {error, data}
 */
const axiosCall = async ({
  url, method, headers, data, timeout,
}) => {
  if (!url) {
    return {
      error: {
        message: 'No URL..',
      },
    };
  }
  if (method) {
    method = method.toLowerCase().trim();
    if (method !== 'get' && method !== 'post' && method !== 'patch' && method !== 'delete' && method !== 'put') {
      return {
        error: {
          message: 'enter a valid METHOD.. Method should be either GET, POST, PUT, PATCH or DELETE',
        },
      };
    }
    if (method === 'get') {
      data = undefined;
    }
  }
  if (headers) {
    if (typeof headers !== 'object') {
      return {
        error: {
          message: 'Header should be a JSON object',
        },
      };
    }
  }
  if (timeout) {
    if (typeof timeout !== 'number') {
      return {
        error: {
          message: 'Timeout should be number. example: 10000 equals 10 seconds',
        },
      };
    }
  }
  try {
    const axiosData = await axios({
      method: method || 'post',
      url,
      data,
      headers,
      // timeout: timeout || 60000,
      timeout: timeout || 120000,
    });
    return {
      data: axiosData.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        error: {
          status: err.response.status,
          data: err.response.data,
          message: err.message,
        },
      };
    }
      if (err.request) {
      return {
        error: {
          status: 500,
          message: err.message,
        },
      };
    }
    return {
      error: {
        message: 'cannot connect due to unseen errors',
        status: 500,
      },
    };
  }
};

export default axiosCall;
