import axios from "axios";

class RequestExecutor {
  baseURL;

  httpRequestConfig = {
    headers: {},
  };

  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async sendGetRequest(endpoint, params) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await axios.get(url, {
        ...this.httpRequestConfig,
        ...(params ? { params } : {}),
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async sendPostRequest(endpoint, body) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await axios.post(url, body, this.httpRequestConfig);
      return response.data;
    } catch (error) {
      return {};
    }
  }
}

export default RequestExecutor;
