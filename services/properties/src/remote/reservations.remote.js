import RequestExecutor from "../../../../../assignment-minut/npm-packages/requestExecutor.js";
import { config } from "../../config.js";
import { reservationStatus } from "../const.js";

export class ReservationsRemoteService {
  static executor = new RequestExecutor(config.reservationsUrl);

  static async getReservations(propertyId, params) {
    return this.executor.sendGetRequest(`/`, {
      propertyId,
      params,
    });
  }
}
