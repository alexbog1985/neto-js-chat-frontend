import Api from '../../services/api';
import ChatView from '../ChatView/ChatView';
import Modal from '../Modal/Modal';
import WS from '../../services/ws';

export class Chat {
  constructor(root) {
    this.container = root;
    this.currentUser = null;
    this.users = [];

    this.api = new Api();
    this.socket = new WS();

    this.onJoin = this.onJoin.bind(this);
    this.handleUsersUpdate = this.handleUsersUpdate.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);

    this.modal = new Modal(this.onJoin);
    this.chatView = new ChatView();
  }

  init() {
    this.container.innerHTML = '';
    this.currentUser = null;

    this.container.append(this.modal.createModal());
    this.container.append(this.chatView.createChatView());

    this.chatView.init(this.onSendMessage);

    this.modal.showModal();

    this.socket.onUsersUpdate(this.handleUsersUpdate);
    this.socket.onMessage(this.handleNewMessage);

    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  async onJoin(nickname) {
    try {
      const response = await this.api.registerUser(nickname);

      if (response.status === 'ok') {
        this.currentUser = response.user;

        this.modal.hideModal();
        this.socket.connect(this.currentUser);
      }
    } catch (error) {
      console.error('Ошибка регистрации: ', error);
      this.modal.showError(error.message);
    }
  }

  handleUsersUpdate(users) {
    this.users = users;
    this.chatView.updateUsersList(users);
    console.log(users);
  }

  onSendMessage(message) {
    if (message && this.socket.isConnected()) {
      this.socket.sendMessage(message);
    }
  }

  handleNewMessage(messageData) {
    const isOwnMessage = this.currentUser && messageData.user && messageData.user && messageData.user.id === this.currentUser.id;

    this.chatView.addMessage(messageData, isOwnMessage);
  }

  handleBeforeUnload() {
    if (this.socket && this.currentUser) {
      this.socket.sendExit();
    }
  }
}
