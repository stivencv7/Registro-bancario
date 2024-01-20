import { Stomp } from '@stomp/stompjs';
import {Subject} from 'rxjs'
import SockJS from 'sockjs-client';

class WebSocketService {
   
    stompClient;
    messagesSubject=new Subject();
 

  constructor() {
    this.connect();
  }

  connect() {

    this.audio = new Audio();
    this.audio.src = 'assets/sounds/n2.mp3';

    const url="//back-registro-bancario-production.up.railway.app/ws"
    const socket=new SockJS(url);
    this.stompClient=Stomp.over(socket)
    
    this.stompClient.connect({}, (frame) => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe('/topic/messages', (message) => {
        this.messagesSubject.next(JSON.parse(message.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
      console.log('Disconnected from WebSocket');
    }
  }
  sendLengthP(numeroCuenta) {
    this.stompClient.send('/app/length',{},JSON.stringify(numeroCuenta));
  }

  getLengthP() {
    return this.messagesSubject.asObservable();
  }
}
const webSocketService = new WebSocketService();
export default webSocketService;