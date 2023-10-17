import AppError from "../../../../../assignment-minut/npm-packages/appError.js";
import PropertyDto from "../dto/properties.dto.js";
import { ReservationsRemoteService } from "../remote/reservations.remote.js";

class PropertiesController {
  constructor(repository) {
    this.repository = repository;
  }

  async createProperty(data) {
    // validate input
    const property = new PropertyDto(data);
    return this.repository.createProperty(property);
  }

  async getPropertyById({ id, role }) {
    const property = await this.repository.getPropertyById(id);

    if (property) {
      return new PropertyDto({ ...property, role });
    } else {
      throw new AppError({ statusCode: 404 });
    }
  }

  async deleteProperty(propertyId) {
    const currenctAndUpcomingReservations =
      await ReservationsRemoteService.getReservations(propertyId, {
        statuses: [
          reservationStatus.CHECKEDIN,
          reservationStatus.REQUESTED,
          reservationStatus.UPCOMING,
        ],
      });
    if (currenctAndUpcomingReservations) {
      throw new AppError({ statusCode: "6325" });
    }
    return this.repository.deleteProperty(id);
  }

  async updateProperty({ id, data }) {
    // validate data
    const property = new PropertyDto(data);
    return this.repository.updateProperty({ id, data: property });
  }

  async getProperties({ data, role }) {
    return this.repository.getProperties({ data, role });
  }
}

export default PropertiesController;
