class MessagesRepository {
  constructor(db) {
    this.db = db;
  }

  async addMessage(data) {
    return this.db.create(data);
  }

  async getMessagesByConversationId({ id, filter }) {
    const query = {
      conversation: id,
    };
    if (filter.cursor) {
      query.createdAt = { $lt: new Date(filter.cursor) };
    }
    return this.db.find({ conversation: id }).sort({ createdAt: -1 });
  }
}

export default MessagesRepository;
