import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class CandidatosGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;
  
    afterInit() {
      console.log('WebSocket Gateway iniciado');
    }
  
    emitirActualizacionCandidato(candidato: any) {
      this.server.emit('candidatoActualizado', candidato);
    }
  }
  