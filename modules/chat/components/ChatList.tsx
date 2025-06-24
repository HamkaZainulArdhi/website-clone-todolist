// ChatList.tsx
import { ChatListProps } from "@/common/types/chat";
import { useRef, useEffect } from "react";
import { marked } from "marked";

const ChatList = ({ messages, isWidget = false }: ChatListProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className={`flex flex-col gap-4 overflow-y-auto overflow-x-hidden scroll-smooth ${
        isWidget ? "max-h-70 p-3" : "h-[calc(100vh-308px)] px-4 py-2"
      }`}
    >
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <div className="max-w-full rounded-lg bg-gray-100 p-8 text-center text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <h3 className="mb-2 text-xl">
              👋 Welcome to my private chatbot AI!
            </h3>
            <p>Ask me anything or start a conversation</p>
          </div>
        </div>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className="flex w-full flex-col">
          {msg.name === "User" ? (
            <>
              <div className="mb-1 flex items-center justify-end gap-2">
                <span className="text-xs text-gray-400">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <div className="flex items-center">
                  <div className="rounded-full px-3 py-1 text-sm text-white">
                    {msg.name}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                    😊
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-neutral-600 px-4 py-3 text-white">
                  <p className="whitespace-pre-line break-words text-sm">
                    {msg.message}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  🤖
                </div>
                <div className="text-sm text-gray-300">{msg.name}</div>
                <span className="ml-1 text-xs text-gray-400">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3 text-gray-800">
                  {msg.is_reply && (
                    <div className="mb-2 rounded border-l-2 bg-gray-200 bg-opacity-20 py-1 pl-2 text-xs italic opacity-75">
                      Replying to previous message
                    </div>
                  )}
                  <div
                    className="whitespace-pre-line break-words text-sm"
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(msg.message),
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatList;
