import axios from 'axios';
import Vue from 'vue';
import CONFIG from '../config';

class HttpClient {
  static GET(url, showError = true) {
    const promise = new Promise(((resolve, reject) => {
      axios.get(`${CONFIG.API_BASE_URL}${url}`, { withCredentials: true })
        .then(response => resolve(response))
        .catch((err) => {
          console.error('Error during GET request', err);

          if (showError === true) {
            Vue.toast.error({
              title: 'Sikertelen',
              message: err.message,
            });
          }

          reject(err);
        });
    }));
    return promise;
  }

  static POST(url, data, showError = true) {
    const promise = new Promise((resolve, reject) => {
      axios.post(`${CONFIG.API_BASE_URL}${url}`, data, { withCredentials: true })
        .then(response => resolve(response))
        .catch((err) => {
          console.error('Error during POST request', JSON.stringify(err.response));

          if (showError === true) {
            Vue.toast.error({
              title: 'Sikertelen',
              message: err.response.data.error.message,
              timeOut: 5000,
            });
          }

          reject(err);
        });
    });
    return promise;
  }
}

export default HttpClient;
