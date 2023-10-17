import AppError from "../../../../npm-packages/appError.js";
import { roles } from "../../../../utils/consts.js";
import { getReservationRole } from "../../../../utils/utils.js";
import { reservationActions, reservationStatus } from "../const.js";
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
    const property = await PropertiesRemoteService.getProperty(
      data.propertyId,
      { checkin: data.checkin, checkout: data.checkout },
    );
    if (!property.isAvailable) {
      throw new AppError({ statusCode: "4009" });
    }
    const { status, propertyId, userId, checkin, checkout } = data;
    const payload = {
      status: status || reservationStatus.REQUESTED,
      propertyId,
      guestId: userId,
      checkin,
      checkout,
    };
    return this.repository.createReservation(payload);
  }

  async getReservationById({ id, userId }) {
    const reservation = await this.repository.getReservationById(id);
    const role = getReservationRole({ userId, reservation });
    if (reservation) {
      if (role !== roles.HOST || role !== roles.GUEST) {
        throw new AppError({ statusCode: "4034" });
      }
      return this.enrichReservation({ reservation, role });
    } else {
      throw new AppError({ statusCode: "4004" });
    }
  }

  async getReservations({ data, userId }) {
    const reservations = await this.repository.getReservations({
      ...data,
      host: data.isHost && userId,
      guest: data.isGuest && userId,
    });
    return Promise.all(
      reservations.map(async (reservation) =>
        this.enrichReservation({
          reservation,
          role: data.isHost ? roles.HOST : roles.GUEST,
        }),
      ),
    );
  }

  async updateReservation({ data, userId }) {
    const reservations = await this.repository.getReservations({
      ...data,
      host: data.isHost && userId,
      guest: data.isGuest && userId,
    });
    const reservation = await this.repository.updateReservation();
  }

  async doActionOnReservation({ userId, action, reservationId }) {
    const reservation = await this.repository.getReservationById(reservationId);
    const role = getReservationRole({ userId, reservation });
    if (role !== roles.HOST || role !== roles.GUEST) {
      throw new AppError({ statusCode: "4034" });
    }

    switch (action) {
      case reservationActions.CANCEL:
        if (
          [
            reservationStatus.CANCELED,
            reservationStatus.CHECKEDIN,
            reservationStatus.CHECKEDOUT,
            reservationStatus.REFUNDED,
          ].includes(reservation.status)
        ) {
          throw new AppError({});
        }
        await this.repository.updateReservation({
          status: reservationStatus.CANCELED,
        });
        return {
          success: true,
        };
      case reservationActions.APPROVE:
        if (reservation.status === reservationStatus.REQUESTED) {
          await this.repository.updateReservation({
            status: reservationStatus.UPCOMING,
          });
          return {
            success: true,
          };
        } else {
          throw new AppError({});
        }
      case reservationActions.REJECT:
        if (reservation.status === reservationStatus.REQUESTED) {
          await this.repository.updateReservation({
            status: reservationStatus.CANCELED,
          });
          return {
            success: true,
          };
        } else {
          throw new AppError({});
        }
      default:
        throw new AppError({});
    }
  }
}

export default ReservationsController;
