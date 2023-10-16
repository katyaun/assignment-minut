import RequestExecutor from "../../../consider-as-project-npm-packages/requestExecutor.js";
import { serviceConfig } from "../../config.js";

export class UsersRemoteService {
  static executor = new RequestExecutor(serviceConfig.usersUrl);

  static async getUser(userId, params) {
    return this.executor.sendGetRequest(`/v1/profiles/${userId}`, params);
  }
}
