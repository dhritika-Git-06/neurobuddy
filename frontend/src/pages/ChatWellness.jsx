import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { chatAPI } from '../services/api';
import { toast } from 'react-toastify';

const ChatWellness = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', message: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage({
        message: input,
        botType: 'wellness',
        threadId,
      });

      if (!threadId) {
        setThreadId(response.data.threadId);
      }

      const botMessage = { sender: 'bot', message: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-card rounded-xl border border-dark-border h-[calc(100vh-200px)] flex flex-col">
          <div className="p-6 border-b border-dark-border bg-dark-bg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Wellness Bot</h1>
                <p className="text-gray-400">Your mental health companion</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-dark-bg">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-lg mb-2">👋 Hi! I'm here to support your mental wellness.</p>
                <p>Feel free to share what's on your mind.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                      : 'bg-dark-card border border-dark-border text-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-card border border-dark-border p-4 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-dark-border bg-dark-card">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatWellness;
