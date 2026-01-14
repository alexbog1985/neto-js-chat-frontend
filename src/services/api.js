const apiUrl = 'http://localhost:3000';

export default class Api {
  async registerUser(nickName) {
    if (!nickName || typeof nickName !== 'string' || nickName.length < 2) {
      throw new Error('Некорректные данные для имени, минимальная длина два символа');
    }

    try {
      const response = await fetch(`${apiUrl}/new-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nickName.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData.message || response.statusText || 'Ошибка регистрации';
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при регистрации пользователя', error);
      throw error;
    }
  }
}
