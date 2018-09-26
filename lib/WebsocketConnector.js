'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _WebsocketContext = require('./WebsocketContext');

var _WebsocketContext2 = _interopRequireDefault(_WebsocketContext);

var _WebsocketClient = require('./WebsocketClient');

var _WebsocketClient2 = _interopRequireDefault(_WebsocketClient);

var _WebsocketEvent = require('./WebsocketEvent');

var _WebsocketEvent2 = _interopRequireDefault(_WebsocketEvent);

require('bottender/lib/session/Session');

require('bottender/lib/bot/Connector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebsocketConnector {

  constructor({ client, accessToken, io } = {}) {
    this._client = client || new _WebsocketClient2.default(io);
  }

  get platform() {
    return 'websocket';
  }

  get client() {
    return this._client;
  }

  getUniqueSessionKey(body) {
    return body.sessionId;
  }

  async updateSession(session) {
    if (!session.user) {
      session.user = {
        id: session.id.split(":")[1],
        _updatedAt: new Date().toISOString()
      };
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user
    });
  }

  mapRequestToEvents(body) {
    return [new _WebsocketEvent2.default(body)];
  }

  createContext(params) {
    return new _WebsocketContext2.default(_extends({}, params, {
      client: this._client
    }));
  }
}
exports.default = WebsocketConnector;