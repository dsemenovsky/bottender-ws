/* @flow */

import { type Event } from 'bottender/lib/context/Event';

export type WebsocketRawEvent = {
  sessionId: string,
  payload: any,
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
    return !!this._rawEvent.payload.msg;
  }

  /**
   * The message object from Websocket raw event.
   *
   */
  get message(): ?string {
    return this._rawEvent.payload.msg || null;
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
    return !!this._rawEvent.payload.data;
  }

  /**
   * The payload string from Websocket raw event.
   *
   */
  get payload(): ?string {
    return this._rawEvent.payload.data || null;
  }
}