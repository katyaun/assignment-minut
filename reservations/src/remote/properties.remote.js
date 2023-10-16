import RequestExecutor from "../../../npm-packages/requestExecutor.js";
import { config } from "../../config.js";

export class PropertiesRemoteService {
  static executor = new RequestExecutor(config.propertiesUrl);

  static async getProperty(propertyId, params) {
    return this.executor.sendGetRequest(`/v1/${propertyId}`, params);
  }
}
