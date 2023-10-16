import { reservationStatus } from "../const.js";
import { PropertiesRemoteService } from "../remote/properties.remote.js";
import { UsersRemoteService } from "../remote/users.remote.js";

class ReservationsController {
  constructor(repository) {
    this.repository = repository;
  }

  async enrichReservation({ reservation, role }) {
    const [guest, property] = Promise.all([
      await UsersRemoteService.getUser(reservation.guest, {
        role,
      }),
      await PropertiesRemoteService.getProperty(reservation.property, { role }),
    ]);

    return {
      reservation,
      guest,
      property,
    };
  }

  async createReservation(data) {
    // check property availability by dates - http request to properties service
    const { status, propertyId, userId, checkin, checkout } = data; // validate
    const payload = {
      status: status || reservationStatus.REQUESTED,
      propertyId,
      guestId: userId,
      checkin,
      checkout,
    };
    return this.repository.createReservation(payload);
  }

  async getReservationById({ id, role }) {
    const reservation =
      await this.repository.getReservationById(id);

    if (reservation) {
      return this.enrichReservation({ reservation, role });
    } else {
      throw new AppError({ statusCode: 404 });
    }
  }

  async getReservations({ data, role }) {
    const reservations = await this.repository.getReservations({
      data,
    });
    return Promise.all(
      reservations.map(async (reservation) =>
        this.enrichReservation({ reservation, role }),
      ),
    );
  }
}

export default ReservationsController;
