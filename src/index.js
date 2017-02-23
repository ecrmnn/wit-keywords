'use strict';

const axios = require('axios');

let data;
let responses;

module.exports = class {
  constructor(accessToken) {
    data = {
      accessToken: undefined,
      concurrency: 3,
      entity: undefined,
      fn: undefined,
      values: [],
      remainingValues: []
    };

    responses = [];

    data.accessToken = accessToken;
  }

  concurrency(concurrency) {
    data.concurrency = concurrency;

    return this;
  }

  entity(entity) {
    data.entity = entity;

    return this;
  }

  after(fn) {
    data.fn = fn;

    return this;
  }

  push(values) {
    data.values = values;
    data.remainingValues = JSON.parse(JSON.stringify(values));

    return new Promise((resolve, reject) => {

      const next = function () {
        if (!data.remainingValues.length) {
          return;
        }

        const value = data.remainingValues.shift()

        axios
          .post('https://api.wit.ai/entities/' + data.entity + '/values?v=20160526', { value }, {
            headers: {
              Authorization: 'Bearer ' + data.accessToken
            }
          })
          .then(res => {
            const result = { value, status: 'added' };
            responses.push(result);

            if (typeof data.fn !== 'undefined') {
              data.fn(result);
            }
            if (!data.remainingValues.length && data.values.length === responses.length) {
              resolve(responses);
            } else {
              next();
            }
          })
          .catch(err => {
            if (err.response.status === 409) {
              const result = { value, status: 'duplicate' };
              responses.push(result);

              if (typeof data.fn !== 'undefined') {
                data.fn(result);
              }
            } else {
              reject(err);
            }

            if (!data.remainingValues.length && data.values.length === responses.length) {
              resolve(responses);
            } else {
              next();
            }
          });
      }

      for (let iterator = 0; iterator < data.concurrency; iterator++) {
        next();
      }
    });
  }
}