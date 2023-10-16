import AppError from "../../../npm-packages/appError.js";

class ConversationsController {
  constructor(conversationsRepository) {
    this.conversationsRepository = conversationsRepository;
  }

  async createConversation(data) {
    const payload = {
      users: data.users,
    };
    return this.conversationsRepository.createConversation(payload);
  }

  async enrichConversation(conversation) {
    // fetch user from remote
    return conversation;
  }

  async getUserConversations({ id }) {
    return this.conversationsRepository.getUserConversations(id);
  }

  async getConversationById({ id }) {
    const conversation = this.conversationsRepository.getConversationById(id);
    if (conversation) {
      return this.enrichConversation(conversation);
    } else {
      throw new AppError({ statusCode: 404 });
    }
  }
}

export default ConversationsController;
