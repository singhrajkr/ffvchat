import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({namespace: '/chat'})
export class SocketAppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('WebSocketGatewayApp');
  @WebSocketServer() wss: Server;

  /**
   * This will run when WebSocket Gateway App Initialized
   * @param server 
   */
  afterInit(server: Server) {
    this.logger.log('Initialized !');
  }

  /**
   * This will run for every client gets connected to WebSocket Gateway App
   * @param client 
   * @param args 
   */
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected ${client.id}`);
  }

  /**
   * This will run for every client gets disconnected to WebSocket Gateway App
   * @param client 
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`);
  }

  /**
   * 
   * @param client 
   * @param payload 
   */
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: {sender: string, message: string}) {
    this.wss.emit('chatToClient', {...message,  userId: client.id});
  }

}









// SINGLE WEBSOCKET APP with Different PORT and Path
// import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { Logger } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway(3003, {path: '/websockets', serveClient: true, namespace: '/'})
// export class SocketAppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

//   private logger: Logger = new Logger('WebSocketGatewayApp')

//   /**
//    * This will run when WebSocket Gateway App Initialized
//    * @param server 
//    */
//   afterInit(server: Server) {
//     this.logger.log('Initialized !');
//   }

//   /**
//    * This will run for every client gets connected to WebSocket Gateway App
//    * @param client 
//    * @param args 
//    */
//   handleConnection(client: Socket, ...args: any[]) {
//     this.logger.log(`Client Connected ${client.id}`);
//   }

//   /**
//    * This will run for every client gets disconnected to WebSocket Gateway App
//    * @param client 
//    */
//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client Disconnected ${client.id}`);
//   }

//   /**
//    * 
//    * @param client 
//    * @param payload 
//    */
//   @SubscribeMessage('messageToServer')
//   handleMessage(client: Socket, payloadFromClient: string): WsResponse<string> {
//     return { event: 'messageToServer', data: `You sent this to server - ${payloadFromClient}`};
//   }

// }