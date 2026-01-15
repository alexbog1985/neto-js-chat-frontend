import Api from '../../services/api';
import ChatView from '../ChatView/ChatView';
import Modal from '../Modal/Modal';
import WS from '../../services/ws';

export default class Chat {
  constructor(root) {
    this.container = root;
    this.currentUser = null;
    this.users = [];

    this.api = new Api();
    this.socket = new WS();

    this.onJoin = this.onJoin.bind(this);
    this.handleUsersUpdate = this.handleUsersUpdate.bind(this);

    this.modal = new Modal(this.onJoin);
    this.chatView = new ChatView();
  }

  init() {
    this.container.innerHTML = '';
    this.currentUser = this.getCurrentUser();
    console.log(this.currentUser);

    this.container.append(this.modal.createModal());
    this.container.append(this.chatView.createChatView());

    if (!this.currentUser) {
      this.modal.showModal();
    }
    this.socket.connect();

    this.socket.onUsersUpdate(this.handleUsersUpdate);
  }

  async onJoin(nickname) {
    const response = await this.api.registerUser(nickname);

    if (response.status === 'ok') {
      this.currentUser = response.user;
      this.saveCurrentUserToLocalStorage(this.currentUser);

      this.modal.hideModal();
    }
  }

  saveCurrentUserToLocalStorage(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return JSON.parse(currentUser);
  }

  handleUsersUpdate(users) {
    this.users = users;
    this.chatView.updateUsersList(users);
    console.log(users);
  }

  onSendMessage(message) {
    if (message && this.socket.isConnected()) {
      const ownMessage = {
        type: 'message',
        message,
        user: this.currentUser,
      };
      this.handleNewMessage(ownMessage);
    }
  }
}
