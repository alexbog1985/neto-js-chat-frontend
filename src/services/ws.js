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
        console.log(data);

        if (Array.isArray(data)) {
          if (this.onUsersUpdateCallback) {
            this.onUsersUpdateCallback(data);
          }
        } else if (data.type === 'send') {
          if (this.onMessageCallback) {
            this.onMessageCallback(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
    };
    
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const messageData = {
        type: 'send',
        message,
        user: this.currentUser,
      };
      this.socket.send(JSON.stringify(messageData));
      return true;
    }
    return false;
  }

  sendExit() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN && this.currentUser) {
      const exitData = {
        type: 'exit',
        user: this.currentUser,
      };
      this.socket.send(JSON.stringify(exitData));
      console.log('Exit message sent for user:', this.currentUser.name);
    }
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
}
