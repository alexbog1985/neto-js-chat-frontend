import './ChatView.css';

export default class ChatView {
  constructor(root) {
    this.root = root;
    this.chatContainer = null;
  }

  createChatView() {
    this.chatContainer = document.createElement('div');
    this.chatContainer.className = 'chat-container';

    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    const sidebarTitle = document.createElement('h3');
    sidebarTitle.textContent = 'Пользователи онлайн';

    const userList = document.createElement('ul');
    userList.className = 'user-list';

    sidebar.append(sidebarTitle, userList);

    const mainChat = document.createElement('div');
    mainChat.className = 'main-chat';

    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'messages-container';

    const messageForm = document.createElement('form');
    messageForm.className = 'message-form';

    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.placeholder = 'Ваше сообщение';
    messageInput.required = true;

    const sendBtn = document.createElement('button');
    sendBtn.className = 'send-btn';
    sendBtn.type = 'submit';
    sendBtn.textContent = 'Отправить';

    messageForm.append(messageInput, sendBtn);

    mainChat.append(messagesContainer, messageForm);

    this.chatContainer.append(sidebar, mainChat);

    return this.chatContainer;
  }
}
