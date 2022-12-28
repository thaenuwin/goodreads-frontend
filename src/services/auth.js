import { isBrowser } from 'react-device-detect'
import axios from 'axios';
import axiosRetry from 'axios-retry';

export default class AuthServices {
  constructor(props) {
    this.url = '/auth';
    this.http = props.http;

    axiosRetry(axios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: axiosRetry.isRetryableError,
    });
  }

  login = (payload) => axios.post(`http://localhost:9999/login`, payload);
  getAccessToken = () => this.http.getAccessToken();
  getRefreshToken = () => this.http.getRefreshToken();

 }
