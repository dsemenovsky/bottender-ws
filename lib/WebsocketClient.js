'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
;
class WebsocketClient {

  constructor(io) {
    this.sendText = (text, socketId) => {
      this.io.to(socketId).emit('bot response', text);
    };

    this.sendPayload = (payload, socketId) => {
      this.io.to(socketId).emit('bot response', payload);
    };

    this.io = io;
  }

}
exports.default = WebsocketClient;