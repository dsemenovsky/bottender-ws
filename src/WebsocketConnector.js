/* @flow */

import WebsocketContext from './WebsocketContext';
import WebsocketClient from './WebsocketClient';
import WebsocketEvent, { type WebsocketRawEvent } from './WebsocketEvent';

import { type Session } from 'bottender/lib/session/Session';
import { type Connector } from 'bottender/lib/bot/Connector';

type WebsocketRequestBody = WebsocketRawEvent;

type ConstructorOptions = {|
  client?: WebsocketClient,
  accessToken: string,
  io: any
|};

export default class WebsocketConnector implements Connector<WebsocketRequestBody> {
  _client: WebsocketClient;

  _fallbackMethods: boolean;

  constructor({ client, accessToken, io }: ConstructorOptions = {}) {
    this._client = client || new WebsocketClient(io)
  }

  get platform(): string {
    return 'websocket';
  }

  get client(): WebsocketClient {
    return this._client;
  }

  getUniqueSessionKey(body: WebsocketRequestBody): string {
    return body.sessionId;
  }

  async updateSession(session: Session): Promise<void> {
    if (!session.user) {
      session.user = {
        id: session.id.split(":")[1],
        _updatedAt: new Date().toISOString(),
      };
    }

    Object.freeze(session.user);
    Object.defineProperty(session, 'user', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: session.user,
    });
  }

  mapRequestToEvents(body: WebsocketRequestBody): Array<WebsocketEvent> {
    return [new WebsocketEvent(body)];
  }

  createContext(params: {
    event: WebsocketEvent,
    session: ?Session,
    initialState: ?Object,
    requestContext: ?Object,
  }) {
    return new WebsocketContext({
      ...params,
      client: this._client
    });
  }
}