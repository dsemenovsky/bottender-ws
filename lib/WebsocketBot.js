'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

require('bottender/lib/session/SessionStore');

var _Bot = require('bottender/lib/bot/Bot');

var _Bot2 = _interopRequireDefault(_Bot);

var _WebsocketConnector = require('./WebsocketConnector');

var _WebsocketConnector2 = _interopRequireDefault(_WebsocketConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebsocketBot extends _Bot2.default {
  constructor({
    accessToken,
    serverUrl,
    httpServer,
    sessionStore
  } = {}) {
    const io = new _socket2.default();
    io.attach(httpServer);
    const connector = new _WebsocketConnector2.default({ accessToken, io });
    super({ connector, sessionStore, sync: true });

    this._io = io;
  }

  createRuntime() {
    const requestHandler = this.createRequestHandler();

    this._io.on('connection', socket => {
      socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
      });

      socket.on('chat message', payload => {
        requestHandler({
          sessionId: socket.id,
          payload
        });
      });
    });
  }
}
exports.default = WebsocketBot;