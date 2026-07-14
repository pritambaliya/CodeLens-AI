import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import {
  getChats,
  getChat,
  sendMessage,
  deleteChat,
} from "../../services/chat";

export default function Chatbot({ onClose }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  // Load all chats
  const loadChats = async () => {
    try {
      const res = await getChats();

      setChats(res.chats);

      // Automatically open latest chat
      if (!currentChat && res.chats.length > 0) {
        openChat(res.chats[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open selected chat
  const openChat = async (chatId) => {
    try {
      setLoading(true);

      const res = await getChat(chatId);

      setCurrentChat(chatId);
      setMessages(res.chat.messages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const handleSend = async (text) => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await sendMessage({
        chatId: currentChat,
        message: text,
      });

      setCurrentChat(res.chatId);
      setMessages(res.messages);

      // Refresh sidebar
      await loadChats();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete chat
  const handleDelete = async (chatId) => {
    try {
      await deleteChat(chatId);

      if (currentChat === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }

      await loadChats();
    } catch (err) {
      console.error(err);
    }
  };

  // New chat
  const handleNewChat = () => {
    setCurrentChat(null);
    setMessages([]);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="flex h-[85vh] w-[95vw] max-w-7xl overflow-hidden rounded-3xl border border-blue-500/20 bg-[#111827] shadow-[0_0_35px_rgba(37,99,235,0.25)]">

        <ChatSidebar
          chats={chats}
          currentChat={currentChat}
          onSelect={openChat}
          onDelete={handleDelete}
          onNewChat={handleNewChat}
        />

        <div className="flex flex-1 flex-col">

          <ChatHeader onClose={onClose} />

          <ChatMessages
            messages={messages}
            loading={loading}
          />

          <ChatInput
            onSend={handleSend}
            loading={loading}
          />

        </div>

      </div>

    </div>
  );
}