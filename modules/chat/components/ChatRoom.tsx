"use client";

import { v4 as uuidv4 } from "uuid";
import { useState, useCallback } from "react";

import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

import { MessageProps } from "@/common/types/chat";
import useNotif from "@/hooks/useNotif";

export const ChatRoom = ({ isWidget = false }: { isWidget?: boolean }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const notif = useNotif();

  const createMessage = useCallback(
    (props: Partial<MessageProps>): MessageProps => ({
      id: uuidv4(),
      name: "",
      email: "",
      image: "",
      message: "",
      is_reply: false,
      reply_to: "",
      is_show: true,
      created_at: new Date().toISOString(),
      ...props,
    }),
    [],
  );

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = createMessage({
      name: "User",
      image: "/user.png",
      message,
    });

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message, // kirim pesan user saja
        }),
      });

      const data = await res.json();

      const botReply =
        data?.choices?.[0]?.message?.content ||
        data?.data?.choices?.[0]?.message?.content ||
        data?.message ||
        "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";

      const botMessage = createMessage({
        name: "Chatbot AI",
        image: "/bot.png",
        message: botReply,
        is_reply: true,
        reply_to: userMessage.id,
      });

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      notif("Gagal menghubungi AI. Silakan coba lagi nanti.");

      const errorMessage = createMessage({
        name: "Chatbot AI",
        image: "/bot.png",
        message: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        is_reply: true,
        reply_to: userMessage.id,
      });

      setMessages((prev) => [...prev, errorMessage]);
    }
    setIsTyping(false);
  };

  const handleCancelReply = useCallback(() => {
    // Placeholder for future implementation
  }, []);

  return (
    <div className="flex h-full flex-col ">
      <div className="flex-1 ">
        <ChatList messages={messages} isWidget={isWidget} />
      </div>

      {/* Area pengetikan bot dengan tinggi tetap */}
      <div className="min-h-[32px] p-2 text-sm italic text-gray-500">
        <span className={isTyping ? "visible" : "invisible"}>
          Chatbot AI sedang mengetik...
        </span>
      </div>

      <div className="w-full">
        <ChatInput
          onSendMessage={handleSendMessage}
          replyName=""
          onCancelReply={handleCancelReply}
          isWidget={isWidget}
        />
      </div>
    </div>
  );
};
