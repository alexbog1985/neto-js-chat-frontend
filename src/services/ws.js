export default class WS {
  constructor() {
    this.socket = null;

    this.currentUser = null;
  }

  connect(user) {
    this.currentUser = user;

    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onopen = () => {
      console.log('WebSocket Connected!');
    };

    this.socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (Array.isArray(data)) {
          if (this.onUsersUpdateCallback) {
            this.onUsersUpdateCallback(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  }

  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  onUsersUpdate(callback) {
    this.onUsersUpdateCallback = callback;
  }

  isConnected() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  getUsers() {

  }
}
