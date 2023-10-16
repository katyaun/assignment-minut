import RequestExecutor from "../../../../../assignment-minut/npm-packages/requestExecutor.js";
import { config } from "../../config.js";
import { reservationStatus } from "../const.js";

export class ReservationsRemoteService {
  static executor = new RequestExecutor(config.reservationsUrl);

  static async getReservations(propertyId) {
    return this.executor.sendGetRequest(`/`, { propertyId, statuses: [reservationStatus.CHECKEDIN, reservationStatus.REQUESTED, reservationStatus.UPCOMING] });
  }
}
