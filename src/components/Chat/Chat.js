// import Api from '../../services/api';
import ChatView from '../ChatView/ChatView';
import Modal from '../Modal/Modal';

export default class Chat {
  constructor(root) {
    this.container = root;
    this.modal = new Modal();
    this.chatView = new ChatView();
  }

  init() {
    this.container.append(this.modal.createModal());
    this.container.append(this.chatView.createChatView());
  }
}
