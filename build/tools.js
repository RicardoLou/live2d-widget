var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import faComment from '@fortawesome/fontawesome-free/svgs/solid/comment.svg';
import faPaperPlane from '@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg';
import faUserCircle from '@fortawesome/fontawesome-free/svgs/solid/circle-user.svg';
import faStreetView from '@fortawesome/fontawesome-free/svgs/solid/street-view.svg';
import faCameraRetro from '@fortawesome/fontawesome-free/svgs/solid/camera-retro.svg';
import faInfoCircle from '@fortawesome/fontawesome-free/svgs/solid/circle-info.svg';
import faXmark from '@fortawesome/fontawesome-free/svgs/solid/xmark.svg';
import showMessage from './message.js';
// DeepSeek API 密钥
var apiKey = 'sk-d3315afda4b248d2bfe056db48c810c4';
// 获取聊天对话框的 DOM 元素
var chatContainer = document.getElementById('chat-container');
var chatBox = document.getElementById('chat-box');
var userInput = document.getElementById('user-input');
// 初始化对话历史
var messages = [
    { role: 'system', content: '您正在与 AI 助手聊天。' }
];
function showHitokoto() {
    // 增加 hitokoto.cn 的 API
    fetch('https://v1.hitokoto.cn')
        .then(function (response) { return response.json(); })
        .then(function (result) {
        var text = "\u8FD9\u53E5\u4E00\u8A00\u6765\u81EA <span>\u300C".concat(result.from, "\u300D</span>\uFF0C\u662F <span>").concat(result.creator, "</span> \u5728 hitokoto.cn \u6295\u7A3F\u7684\u3002");
        showMessage(result.hitokoto, 6000, 9);
        setTimeout(function () {
            showMessage(text, 4000, 9);
        }, 6000);
    });
}
// 发送消息到 DeepSeek API
function sendMessage(content) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, reply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messages.push({ role: 'user', content: content });
                    return [4 /*yield*/, fetch('https://api.deepseek.com/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(apiKey)
                            },
                            body: JSON.stringify({
                                model: 'deepseek-chat',
                                messages: messages,
                                stream: false
                            })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    reply = data.choices[0].message.content;
                    messages.push({ role: 'assistant', content: reply });
                    updateChatBox();
                    return [2 /*return*/];
            }
        });
    });
}
// 更新聊天框显示
function updateChatBox() {
    chatBox.innerHTML = '';
    messages.forEach(function (message) {
        var messageElement = document.createElement('div');
        messageElement.style.marginBottom = '10px';
        messageElement.style.padding = '5px';
        messageElement.style.borderRadius = '5px';
        if (message.role === 'user') {
            messageElement.style.backgroundColor = '#e0f7fa';
            messageElement.style.alignSelf = 'flex-end';
        }
        else {
            messageElement.style.backgroundColor = '#f1f1f1';
            messageElement.style.alignSelf = 'flex-start';
        }
        messageElement.textContent = message.content;
        chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}
// 处理用户输入
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && userInput.value.trim() !== '') {
        var content = userInput.value.trim();
        userInput.value = '';
        sendMessage(content);
    }
});
// 显示或隐藏聊天对话框
function toggleChat() {
    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'flex';
    }
    else {
        chatContainer.style.display = 'none';
    }
}
// 定义工具对象并替换 asteroids 功能
var tools = {
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
        callback: function () { },
    },
    'switch-texture': {
        icon: faStreetView,
        callback: function () { },
    },
    photo: {
        icon: faCameraRetro,
        callback: function () {
            showMessage('照好了嘛，是不是很可爱呢？', 6000, 9);
            Live2D.captureName = 'photo.png';
            Live2D.captureFrame = true;
        },
    },
    info: {
        icon: faInfoCircle,
        callback: function () {
            open('https://github.com/stevenjoezhang/live2d-widget');
        },
    },
    quit: {
        icon: faXmark,
        callback: function () {
            localStorage.setItem('waifu-display', Date.now().toString());
            showMessage('愿你有一天能与重要的人重逢。', 2000, 11);
            var waifu = document.getElementById('waifu');
            if (!waifu)
                return;
            waifu.style.bottom = '-500px';
            setTimeout(function () {
                waifu.style.display = 'none';
                var waifuToggle = document.getElementById('waifu-toggle');
                if (!waifuToggle)
                    return;
                waifuToggle.classList.add('waifu-toggle-active');
            }, 3000);
        },
    },
};
export default tools;
