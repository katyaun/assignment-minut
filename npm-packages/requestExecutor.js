import axios from "axios";
import AppError from "./appError";

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
      throw new AppError({});
    }
  }

  async sendPostRequest(endpoint, body) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await axios.post(url, body, this.httpRequestConfig);
      return response.data;
    } catch (error) {
      throw new AppError({});
    }
  }
}

export default RequestExecutor;
