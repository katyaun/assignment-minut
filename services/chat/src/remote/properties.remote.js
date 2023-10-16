import RequestExecutor from "../../../consider-as-project-npm-packages/requestExecutor.js";
import { serviceConfig } from "../../config.js";

export class PropertiesRemoteService {
  static executor = new RequestExecutor(serviceConfig.propertiesUrl);

  static async getProperty(propertyId, params) {
    return this.executor.sendGetRequest(`/v1/${propertyId}`, params);
  }
}
