"use client";

import { Bot, Loader2, Send, User, X } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  // Sample initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m your AI career assistant. How can I help you with your job search or career planning today?'
        }
      ]);
    }
  }, [messages.length]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const sessionId = 'default-session'; // You can generate unique session IDs
    const userId = 1; // For demo purposes - in real app, get from auth context

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);

    // Save user message to database
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          sessionId,
          message: input,
          role: 'user'
        }),
      });
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    // Clear input field
    setInput('');

    // Set loading state
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          type: 'conversation'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = data.response || "I'm sorry, I couldn't process that request.";

      // Add AI response to chat
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: assistantMessage }
      ]);

      // Save assistant message to database
      try {
        await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            sessionId,
            message: assistantMessage,
            role: 'assistant'
          }),
        });
      } catch (error) {
        console.error('Error saving assistant message:', error);
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      const errorMessage = "I'm sorry, I encountered an error. Please try again later.";
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: errorMessage }
      ]);

      // Save error message to database
      try {
        await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            sessionId,
            message: errorMessage,
            role: 'assistant'
          }),
        });
      } catch (dbError) {
        console.error('Error saving error message:', dbError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-[60] transition-all duration-300 ${
          isDarkMode
            ? 'bg-amber-500 hover:bg-amber-600 text-gray-900'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-label="Toggle chat assistant"
      >
        {isChatOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 w-96 h-[500px] rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform z-[60] ${
          isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        } ${
          isDarkMode
            ? 'bg-gray-900 border border-amber-700/30'
            : 'bg-white border border-gray-200'
        }`}
      >
        {/* Chat header */}
        <div className={`p-4 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <h3 className="font-medium">Career Assistant</h3>
          </div>
        </div>

        {/* Messages container */}
        <div className={`p-4 h-[380px] overflow-y-auto ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? isDarkMode
                    ? 'bg-amber-500 text-gray-900'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-100'
                    : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  {message.role === 'user'
                    ? <><span className="font-medium">You</span><User size={14} /></>
                    : <><Bot size={14} /><span className="font-medium">Assistant</span></>
                  }
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className={`inline-block px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-center space-x-2">
                  <Bot size={14} />
                  <span className="font-medium">Assistant</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className={`flex-1 p-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`p-2 rounded-md ${
                isDarkMode
                  ? 'bg-amber-500 hover:bg-amber-600 text-gray-900 disabled:bg-gray-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
