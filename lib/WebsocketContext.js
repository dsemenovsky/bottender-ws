'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delay = require('delay');

var _delay2 = _interopRequireDefault(_delay);

require('bottender/lib/session/Session');

require('bottender/lib/context/PlatformContext');

var _Context = require('bottender/lib/context/Context');

var _Context2 = _interopRequireDefault(_Context);

var _WebsocketClient = require('./WebsocketClient');

var _WebsocketClient2 = _interopRequireDefault(_WebsocketClient);

var _WebsocketEvent = require('./WebsocketEvent');

var _WebsocketEvent2 = _interopRequireDefault(_WebsocketEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebsocketContext extends _Context2.default {

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext
  }) {
    super({ client, event, session, initialState, requestContext });
    this._client = this._client;
    this._event = this._event;
    this._session = this._session;
  }

  /**
   * The name of the platform.
   *
   */
  get platform() {
    return 'websocket';
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds) {
    if (milliseconds > 0) {
      await (0, _delay2.default)(milliseconds);
    }
  }

  /**
   * Send text to the owner of then session.
   *
   */
  sendText(text) {
    this._client.sendText(text, this._session.user.id);
  }

  /**
   * Send payload to the owner of then session.
   *
   */
  sendPayload(payload) {
    this._client.sendPayload(payload, this._session.user.id);
  }

  // async _methodMissing(method: string, args: Array<any>): Promise<void> {
  //   this._isHandled = true;
  //   this._client.sendText(
  //     `${method} with args:\n${JSON.stringify(args, null, 2)}`
  //   );
  // }
}
exports.default = WebsocketContext;