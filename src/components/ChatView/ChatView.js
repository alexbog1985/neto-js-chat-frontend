import './ChatView.css';

export default class ChatView {
  constructor() {
    this.chatContainer = null;
    this.messagesContainer = null;
    this.messageForm = null;
    this.messageInput = null;
    this.onSendMessage = null;
  }

  createChatView() {
    this.chatContainer = document.createElement('div');
    this.chatContainer.className = 'chat-container';

    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    const sidebarTitle = document.createElement('h3');
    sidebarTitle.textContent = 'Пользователи онлайн';

    this.userList = document.createElement('ul');
    this.userList.className = 'user-list';

    sidebar.append(sidebarTitle, this.userList);

    const mainChat = document.createElement('div');
    mainChat.className = 'main-chat';

    this.messagesContainer = document.createElement('div');
    this.messagesContainer.className = 'messages-container';

    this.messageForm = document.createElement('form');
    this.messageForm.className = 'message-form';

    this.messageInput = document.createElement('input');
    this.messageInput.type = 'text';
    this.messageInput.placeholder = 'Ваше сообщение';
    this.messageInput.required = true;

    const sendBtn = document.createElement('button');
    sendBtn.className = 'send-btn';
    sendBtn.type = 'submit';
    sendBtn.textContent = 'Отправить';

    this.messageForm.append(this.messageInput, sendBtn);

    mainChat.append(this.messagesContainer, this.messageForm);

    this.chatContainer.append(sidebar, mainChat);

    return this.chatContainer;
  }

  init(onSendMessage) {
    this.onSendMessage = onSendMessage;

    if (this.messageForm) {
      this.messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = this.messageInput.value.trim();
        if (message && this.onSendMessage) {
          this.onSendMessage(message);
          this.messageInput.value = '';
        }
      });
    }
  }

  updateUsersList(users) {
    if (!this.userList) return;

    this.userList.innerHTML = '';

    users.forEach((user) => {
      const userItem = document.createElement('li');
      userItem.textContent = user.name;
      this.userList.append(userItem);
    });
  }

  addMessage(messageData, isOwnMessage) {
    if (!this.messagesContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'sent' : 'received'}`;

    const senderElement = document.createElement('div');
    senderElement.className = 'message-sender';
    senderElement.textContent = isOwnMessage ? 'Вы' : messageData.user.name;

    const textElement = document.createElement('div');
    textElement.className = 'message-text';
    textElement.textContent = messageData.message;

    messageElement.append(senderElement, textElement);
    this.messagesContainer.append(messageElement);

    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}
