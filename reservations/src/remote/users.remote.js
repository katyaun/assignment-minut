import RequestExecutor from "../../../npm-packages/requestExecutor.js";
import { config } from "../../config.js";

export class UsersRemoteService {
  static executor = new RequestExecutor(config.usersUrl);

  static async getUser(userId, params) {
    return this.executor.sendGetRequest(`/v1/profiles/${userId}`, params);
  }
}
