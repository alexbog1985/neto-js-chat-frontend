import Chat from '../components/Chat/Chat';
import ChatView from '../components/ChatView/ChatView';

const root = document.querySelector('#root');

const app = new Chat(root);
app.init(root);
