/* @flow */

import { type Event } from 'bottender/lib/context/Event';

export type WebsocketRawEvent = {
  sessionId: string,
  message?: string,
  payload?: any,
};

export default class WebsocketEvent implements Event {
  _rawEvent: WebsocketRawEvent;

  constructor(rawEvent: WebsocketRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Console.
   *
   */
  get rawEvent(): WebsocketRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return !!this._rawEvent.message;
  }

  /**
   * The message object from Console raw event.
   *
   */
  get message(): ?string {
    return this._rawEvent.message || null;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    if (this.isMessage) {
      return true;
    }
    return false;
  }

  /**
   * The text string from Console raw event.
   *
   */
  get text(): ?string {
    if (this.isText) {
      return this.message;
    }
    return null;
  }

  /**
   * Determine if the event is a payload event.
   *
   */
  get isPayload(): boolean {
    return !!this._rawEvent.payload;
  }

  /**
   * The payload string from Websocket raw event.
   *
   */
  get payload(): ?string {
    return this._rawEvent.payload || null;
  }
}