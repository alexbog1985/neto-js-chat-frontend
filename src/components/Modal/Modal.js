import './Modal.css';

export default class Modal {
  constructor(root) {
    this.root = root;

    this.modalElement = null;
    this.nicknameInput = null;
    this.joinBtn = null;
  }

  createModal() {
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Введите свой псевдоним:';

    const modalForm = document.createElement('form');
    modalForm.className = 'modal-form';

    this.nicknameInput = document.createElement('input');
    this.nicknameInput.type = 'text';
    this.nicknameInput.required = true;
    this.nicknameInput.className = 'nickname-input';

    this.joinBtn = document.createElement('button');
    this.joinBtn.type = 'submit';
    this.joinBtn.textContent = 'Подключиться';

    modalForm.append(this.nicknameInput, this.joinBtn);

    modalContent.append(modalTitle, modalForm);

    this.modalElement.append(modalContent);

    return this.modalElement;
  }

  hideModal() {
    this.modalElement.style.display = 'none';
  }

  showModal() {
    this.modalElement.style.display = 'flex';
  }
}
