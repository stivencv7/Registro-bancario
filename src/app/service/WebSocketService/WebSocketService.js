import { Stomp } from '@stomp/stompjs';
import {Subject} from 'rxjs'
import SockJS from 'sockjs-client';
import { REACT_APP_SOCKET_PORT, URL_SOCKET } from '../../consts/variables';
// back-registro-bancario-production.up.railway.app
//localhost:8080
class WebSocketService {
   
  stompClient;
  messagesSubject=new Subject();
 

  constructor() {
    this.connect();
  }

  connect() {

    const url=`//back-registro-bancario-production.up.railway.app/ws`
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
  
  sendLengthP(numeroCuenta,user) {
    const message = {numeroCuenta:numeroCuenta,user:user};
    this.stompClient.send('/app/length',{},JSON.stringify(message));
  }

  getLengthP() {
    return this.messagesSubject.asObservable();
  }
}
const webSocketService = new WebSocketService();
export default webSocketService;