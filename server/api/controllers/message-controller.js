const messageService = require("../service/message-service");

class MessageController {
  async getMessages(req, res, next) {
    try {
      const { messageDepartment, nextPageToken } = req.body;
      const messages = await messageService.getMessages(
        messageDepartment,
        nextPageToken
      );
      return res.send(messages).json();
    } catch (e) {
      next(e);
    }
  }

  async getMessage(req, res, next) {
    try {
      const message = await messageService.getMessage();
      return res.send(message).json();
    } catch (e) {
      next(e);
    }
  }
  async sendMessage(req, res, next) {
    try {
      const message = req.body;
      const mes = await messageService.sendMessage(message);
      return res.send(mes).json();
    } catch (e) {
      next(e);
    }
  }
  async saveDraft(req, res, next) {
    try {
      const message = req.body;
      const mes = await messageService.saveDraft(message);
      return res.send(mes).json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MessageController();
