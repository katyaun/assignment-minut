class ReservationsRepository {
  constructor(db) {
    this.db = db;
  }

  async createReservation(data) {
    return this.db.create(data);
  }

  async getReservationById(reservationId) {
    return this.db.findOne({ _id: reservationId });
  }

  async getReservations({ data }) {
    const queryFilter = data; // create filter obj or aggregation e.g. search by region or by polygon
    return this.db.find(queryFilter);
  }

  async updateReservation({ data }) {
    return this.db.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },
    );
  }
}

export default ReservationsRepository;
