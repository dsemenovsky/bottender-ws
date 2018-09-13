/* @flow */

import sleep from 'delay';

import { type Session } from 'bottender/lib/session/Session';
import { type PlatformContext } from 'bottender/lib/context/PlatformContext';
import Context from 'bottender/lib/context/Context';


import WebsocketClient from './WebsocketClient';
import WebsocketEvent from './WebsocketEvent';


type Options = {|
  client: WebsocketClient,
  event: WebsocketEvent,
  session: ?Session,
  initialState: ?Object,
  requestContext: ?Object
|};

export default class WebsocketContext extends Context implements PlatformContext {
  _client: WebsocketClient = this._client;
  _event: WebsocketEvent = this._event;
  _session: ?Session = this._session;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext
  }: Options) {
    super({ client, event, session, initialState, requestContext });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'websocket';
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    if (milliseconds > 0) {
      await sleep(milliseconds);
    }
  }


  /**
   * Send text to the owner of then session.
   *
   */
  sendText(text: string): void {
    this._client.sendText(text, this._session.user.id);
  }

  /**
   * Send payload to the owner of then session.
   *
   */
  sendPayload(payload: any): void {
    this._client.sendPayload(payload, this._session.user.id);
  }

  // async _methodMissing(method: string, args: Array<any>): Promise<void> {
  //   this._isHandled = true;
  //   this._client.sendText(
  //     `${method} with args:\n${JSON.stringify(args, null, 2)}`
  //   );
  // }
}
