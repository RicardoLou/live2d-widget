import faComment from '@fortawesome/fontawesome-free/svgs/solid/comment.svg';
import faPaperPlane from '@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg';
import faUserCircle from '@fortawesome/fontawesome-free/svgs/solid/circle-user.svg';
import faStreetView from '@fortawesome/fontawesome-free/svgs/solid/street-view.svg';
import faCameraRetro from '@fortawesome/fontawesome-free/svgs/solid/camera-retro.svg';
import faInfoCircle from '@fortawesome/fontawesome-free/svgs/solid/circle-info.svg';
import faXmark from '@fortawesome/fontawesome-free/svgs/solid/xmark.svg';

import showMessage from './message.js';

// DeepSeek API 密钥
const apiKey = 'sk-d3315afda4b248d2bfe056db48c810c4';

// 获取聊天对话框的 DOM 元素
const chatContainer = document.getElementById('chat-container') as HTMLDivElement;
const chatBox = document.getElementById('chat-box') as HTMLDivElement;
const userInput = document.getElementById('user-input') as HTMLInputElement;

// 初始化对话历史
let messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
  { role: 'system', content: '您正在与 AI 助手聊天。' }
];
function showHitokoto() {
  // 增加 hitokoto.cn 的 API
  fetch('https://v1.hitokoto.cn')
    .then((response) => response.json())
    .then((result) => {
      const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
      showMessage(result.hitokoto, 6000, 9);
      setTimeout(() => {
        showMessage(text, 4000, 9);
      }, 6000);
    });
}
// 发送消息到 DeepSeek API
async function sendMessage(content: string) {
  messages.push({ role: 'user', content });
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: messages,
      stream: false
    })
  });
  const data = await response.json();
  const reply = data.choices[0].message.content;
  messages.push({ role: 'assistant', content: reply });
  updateChatBox();
}

// 更新聊天框显示
function updateChatBox() {
  chatBox.innerHTML = '';
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.style.marginBottom = '10px';
    messageElement.style.padding = '5px';
    messageElement.style.borderRadius = '5px';
    if (message.role === 'user') {
      messageElement.style.backgroundColor = '#e0f7fa';
      messageElement.style.alignSelf = 'flex-end';
    } else {
      messageElement.style.backgroundColor = '#f1f1f1';
      messageElement.style.alignSelf = 'flex-start';
    }
    messageElement.textContent = message.content;
    chatBox.appendChild(messageElement);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 处理用户输入
userInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && userInput.value.trim() !== '') {
    const content = userInput.value.trim();
    userInput.value = '';
    sendMessage(content);
  }
});

// 显示或隐藏聊天对话框
function toggleChat() {
  if (chatContainer.style.display === 'none') {
    chatContainer.style.display = 'flex';
  } else {
    chatContainer.style.display = 'none';
  }
}

// 定义工具对象并替换 asteroids 功能
const tools = {
  hitokoto: {
    icon: faComment,
    callback: showHitokoto,
  },
  chat: {
    icon: faPaperPlane,
    callback: toggleChat,
  },
  'switch-model': {
    icon: faUserCircle,
    callback: () => {},
  },
  'switch-texture': {
    icon: faStreetView,
    callback: () => {},
  },
  photo: {
    icon: faCameraRetro,
    callback: () => {
      showMessage('照好了嘛，是不是很可爱呢？', 6000, 9);
      Live2D.captureName = 'photo.png';
      Live2D.captureFrame = true;
    },
  },
  info: {
    icon: faInfoCircle,
    callback: () => {
      open('https://github.com/stevenjoezhang/live2d-widget');
    },
  },
  quit: {
    icon: faXmark,
    callback: () => {
      localStorage.setItem('waifu-display', Date.now().toString());
      showMessage('愿你有一天能与重要的人重逢。', 2000, 11);
      const waifu = document.getElementById('waifu') as HTMLDivElement;
      if (!waifu) return;
      waifu.style.bottom = '-500px';
      setTimeout(() => {
        waifu.style.display = 'none';
        const waifuToggle = document.getElementById('waifu-toggle');
        if (!waifuToggle) return;
        waifuToggle.classList.add('waifu-toggle-active');
      }, 3000);
    },
  },
};

export default tools;