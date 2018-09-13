/* @flow */
import Server from 'socket.io'

import { type SessionStore } from 'bottender/lib/session/SessionStore';

import Bot from 'bottender/lib/bot/Bot';
import WebsocketConnector from './WebsocketConnector';

export default class WebsocketBot extends Bot {
  constructor({
    accessToken,
    serverUrl,
    httpServer,
    sessionStore
  }: {
    accessToken: string,
    serverUrl: string,
    httpServer: any,
    sessionStore: SessionStore,
  } = {}) {
    const io = new Server();
    io.attach(httpServer)
    const connector = new WebsocketConnector({ accessToken, io });
    super({ connector, sessionStore, sync: true });
  
    this._io = io    
  }

  createRuntime() {
    const requestHandler = this.createRequestHandler();

    this._io.on('connection', (socket) => {    
      socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
      });
    
      socket.on('chat message', (msg) => { 
        requestHandler({
          sessionId: socket.id,
          message: msg
        });
      });
    });

  }
}