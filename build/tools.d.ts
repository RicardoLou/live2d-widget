declare function showHitokoto(): void;
declare function toggleChat(): void;
declare const tools: {
    hitokoto: {
        icon: string;
        callback: typeof showHitokoto;
    };
    chat: {
        icon: string;
        callback: typeof toggleChat;
    };
    'switch-model': {
        icon: string;
        callback: () => void;
    };
    'switch-texture': {
        icon: string;
        callback: () => void;
    };
    photo: {
        icon: string;
        callback: () => void;
    };
    info: {
        icon: string;
        callback: () => void;
    };
    quit: {
        icon: string;
        callback: () => void;
    };
};
export default tools;
