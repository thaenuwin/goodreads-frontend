import { makeAutoObservable } from 'mobx';
// import { getBooleanValue } from 'helpers';
import axios from 'axios';

class AuthStore {
  constructor(props) {
    this.api = props.api;
    this.CancelToken = axios.CancelToken;
    this.source = false;
    makeAutoObservable(this)
  }

  login = (payload) => {
    return new Promise((resolve, reject) => {
      this.api
        .login(payload)
        .then((res) => {
          // this.api.setPasswordExpiryStatus(getBooleanValue(res?.data?.passwordExpired));
          this.setTokens(res.data);
          resolve(res);
        })
        .catch((err) => reject(err.response));
    });
  };

  setTokens = (data) =>
    this.api.http.setTokens({
      accessToken: data.access_token
    });

  forgotPassword = (payload) => {
    return new Promise((resolve, reject) => {
      this.api
        .forgotPassword(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err.response));
    });
  };

 

  setIfPasswordExpired = () => {};

  logout = () => {
    this.api.logout();
  };

  getAccessToken = () => this.api.getAccessToken();
  

  // checkIfPasswordExpired = () => {
  //   const status = this.api.getPasswordExpiryStatus();

  //   return getBooleanValue(status);
  // };
}

export default AuthStore;
