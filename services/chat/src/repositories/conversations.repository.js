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
}

export default ConversationRepository;
