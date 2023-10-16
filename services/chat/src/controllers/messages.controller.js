class ConversationsController {
  constructor(messagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  async addMessage(data) {
    const payload = {
      sender: data.senderId,
      reciever: data.recieverId,
      content: data.content,
      conversation: data.conversationId,
    };

    return this.messagesRepository.addMessage(payload);
  }

  async getMessagesByConversationId({ id, filter }) {
    const messages = this.messagesRepository.getMessagesByConversationId({
      id,
      filter,
    });

    return {
      messages,
      cursor:
        messages.length > 0 ? messages[messages.length - 1].createdAt : null,
    };
  }
}

export default ConversationsController;
