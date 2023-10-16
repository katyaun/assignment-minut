class ConversationRepository {
  constructor(db) {
    this.db = db;
  }

  async createConversation(data) {
    return this.db.create(data);
  }

  async getUserConversations(id) {
    return this.db.find({ users: id });
  }

  async getConversationById(id) {
    return this.db.findOne({ _id: id });
  }

  async getReservations({ data }) {
    const queryFilter = data; // create filter obj or aggregation e.g. search by region or by polygon
    return this.db.find(queryFilter);
  }
}

export default ConversationRepository;
