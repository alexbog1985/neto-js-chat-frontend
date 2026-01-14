import './Modal.css';

export default class Modal {
  constructor(onJoin) {
    if (typeof onJoin !== 'function') {
      throw new Error('Modal constructor must be a function');
    }

    this.onJoin = onJoin;

    this.modalElement = null;
    this.modalForm = null;
    this.nicknameInput = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  createModal() {
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal hidden';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Введите свой псевдоним:';

    const modalForm = document.createElement('form');
    modalForm.className = 'modal-form';

    this.nicknameInput = document.createElement('input');
    this.nicknameInput.type = 'text';
    this.nicknameInput.minLength = 2;
    this.nicknameInput.required = true;
    this.nicknameInput.className = 'nickname-input';
    this.nicknameInput.placeholder = 'Минимум 2 символа';
    this.nicknameInput.autofocus = true;

    const joinBtn = document.createElement('button');
    joinBtn.type = 'submit';
    joinBtn.textContent = 'Подключиться';

    modalForm.addEventListener('submit', this.handleSubmit);
    this.modalElement.addEventListener('keydown', this.handleKeydown);

    modalForm.append(this.nicknameInput, joinBtn);
    modalContent.append(modalTitle, modalForm);
    this.modalElement.append(modalContent);

    return this.modalElement;
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.nicknameInput.value.trim();
    if (value.length >= 2) {
      this.onJoin(value);
      // this.hideModal();
    } else {
      this.nicknameInput.reportValidity();
    }
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  }

  showModal() {
    if (!this.modalElement) return;
    this.modalElement.classList.remove('hidden');
    this.nicknameInput.focus();
    this.nicknameInput.value = '';
  }

  hideModal() {
    if (!this.modalElement) return;
    this.modalElement.classList.add('hidden');
  }

  destroy() {
    if (this.modalElement && this.modalElement.parentNode) {
      this.modalElement.remove();
    }
    this.modalElement = null;
    this.nicknameInput = null;
  }
}
