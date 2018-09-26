'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('bottender/lib/context/Event');

class WebsocketEvent {

  constructor(rawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Console.
   *
   */
  get rawEvent() {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage() {
    return !!this._rawEvent.payload.msg;
  }

  /**
   * The message object from Websocket raw event.
   *
   */
  get message() {
    return this._rawEvent.payload.msg || null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText() {
    if (this.isMessage) {
      return true;
    }
    return false;
  }

  /**
   * The text string from Console raw event.
   *
   */
  get text() {
    if (this.isText) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a payload event.
   *
   */
  get isPayload() {
    return !!this._rawEvent.payload.data;
  }

  /**
   * The payload string from Websocket raw event.
   *
   */
  get payload() {
    return this._rawEvent.payload.data || null;
  }
}
exports.default = WebsocketEvent;