class PropertiesRepository {
  constructor(db) {
    this.db = db;
  }

  async createProperty(data) {
    return this.db.create(data);
  }

  async getPropertyById(propertyId) {
    return this.db.findOne({ _id: propertyId });
  }

  async getProperties({ data }) {
    const queryFilter = data; // create filter obj or aggregation e.g. search by region/polygon
    return this.db.find(queryFilter);
  }

  async deleteProperty(id) {
    await this.db.deleteOne({ _id: id });
  }

  async updateProperty({ id, data }) {
    return this.db.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },
    );
  }
}

export default PropertiesRepository;
