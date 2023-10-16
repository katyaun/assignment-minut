import RequestExecutor from "../../../../../assignment-minut/npm-packages/requestExecutor.js";
import { config } from "../../config.js";

export class UsersRemoteService {
  static executor = new RequestExecutor(config.usersUrl);

  static async createUser(params) {
    return this.executor.sendPostRequest("/v1/profiles", params);
  }

  static async getUser(userId) {
    return this.executor.sendGetRequest(`/${userId}`);
  }
}
