import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PaperclipIcon, SendIcon } from "lucide-react";

export default function MessageConversation({
  conversation = null,
  messages = [],
  currentUser = {},
  onSendMessage,
  className = "",
}) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Format timestamp to readable time
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};

    messages.forEach((message) => {
      const date = new Date(message.timestamp);
      const dateStr = date.toLocaleDateString();

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  // If no conversation is selected
  if (!conversation) {
    return (
      <Card
        className={`flex flex-col items-center justify-center h-full ${className}`}
      >
        <div className="text-center p-8">
          <div className="bg-muted rounded-full p-6 inline-block mb-4">
            <SendIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
          <p className="text-muted-foreground mb-6">
            Select a conversation from the list or start a new one
          </p>
          <Button>Start New Conversation</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={`flex flex-col h-full border rounded-lg ${className}`}>
      {/* Conversation header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            {conversation.image ? (
              <AvatarImage src={conversation.image} alt={conversation.name} />
            ) : (
              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">{conversation.name}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.type === "supplier" ? "Supplier" : "Buyer"} •{" "}
              {conversation.status || "Online"}
            </p>
          </div>
        </div>
        <div>
          <Button variant="outline" size="sm">
            View Profile
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        {Object.keys(messageGroups).map((date) => (
          <div key={date} className="mb-6">
            <div className="relative flex items-center py-4">
              <Separator className="flex-1" />

              <span className="text-xs text-muted-foreground bg-background px-2 absolute left-1/2 transform -translate-x-1/2">
                {date}
              </span>
            </div>

            {messageGroups[date].map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;

              return (
                <div
                  key={message.id}
                  className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      {conversation.image ? (
                        <AvatarImage
                          src={conversation.image}
                          alt={conversation.name}
                        />
                      ) : (
                        <AvatarFallback>
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[70%] ${isCurrentUser ? "order-1" : "order-2"}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.attachment && (
                        <div className="mt-2 p-2 bg-background/10 rounded flex items-center gap-2">
                          <PaperclipIcon className="h-4 w-4" />

                          <span className="text-xs truncate">
                            {message.attachment.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatMessageTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="flex-shrink-0"
          >
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />

          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className="flex-shrink-0"
          >
            <SendIcon className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
