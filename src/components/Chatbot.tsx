import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsX, BsChatDots } from 'react-icons/bs';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    // Initial size
    const [dimensions, setDimensions] = useState({ width: 320, height: 450 });
    const isResizing = React.useRef(false);
    const startResizing = React.useRef({ x: 0, y: 0, width: 0, height: 0 });

    // Initialize with greeting
    React.useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ text: t('Chatbot.Greeting'), sender: 'bot' }]);
        }
    }, [t, messages.length]);

    // Scroll to bottom functionality
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Resize handlers
    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        startResizing.current = {
            x: e.clientX,
            y: e.clientY,
            width: dimensions.width,
            height: dimensions.height
        };
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
    };

    const handleResize = (e: MouseEvent) => {
        if (!isResizing.current) return;

        // Calculate new dimensions based on drag delta (dragging left/up increases size)
        const deltaX = startResizing.current.x - e.clientX;
        const deltaY = startResizing.current.y - e.clientY;

        setDimensions({
            width: Math.max(300, Math.min(600, startResizing.current.width + deltaX)),
            height: Math.max(400, Math.min(800, startResizing.current.height + deltaY))
        });
    };

    const stopResize = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://gunessh.online/webhook/023640c7-ec95-4884-b429-79bc9b78d84a', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            let botResponse = "I received your message.";

            if (typeof data === 'string') {
                botResponse = data;
            } else if (data.output) {
                botResponse = data.output;
            } else if (data.message) {
                botResponse = data.message;
            } else if (data.text) {
                botResponse = data.text;
            } else if (data.response) {
                botResponse = data.response;
            } else {
                botResponse = JSON.stringify(data);
            }

            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div
                    className="chatbot-window"
                    style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
                >
                    <div className="resize-handle" onMouseDown={startResize} title="Drag to resize"></div>
                    <div className="chatbot-header">
                        <h3><BsChatDots size={20} /> Chat</h3>
                        <button className="close-chat-btn" onClick={toggleChat}>
                            <BsX size={24} />
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-bubble message-bot">
                                ...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder={t('Chatbot.Placeholder')}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            )}

            <button className="chatbot-toggle" onClick={toggleChat} aria-label="Toggle Chatbot">
                {isOpen ? <BsX size={32} /> : <BsChatDots size={28} />}
            </button>
        </div>
    );
};

export default Chatbot;
