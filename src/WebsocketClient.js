/* @flow */
interface IWebsocketClient {

  sendText(text: string, sessionId: string): void,

  sendPayload(payload: any, sessionId: string): void,
};

export default class WebsocketClient implements IWebsocketClient {
  accessToken: string
  io: any

  constructor(io: any) {
    this.io = io
  }

  sendText = (text: string, socketId: string) => {
    this.io.to(socketId).emit('bot response', text);
  }

  sendPayload = (payload: any, socketId: string) => {
    this.io.to(socketId).emit('bot response', payload);
  }
}
