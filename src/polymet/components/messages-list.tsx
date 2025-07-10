import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, UserIcon } from "lucide-react";

export default function MessagesList({
  conversations = [],
  activeConversationId = null,
  onSelectConversation,
  className = "",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredConversations = conversations
    .filter((conversation) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          conversation.name.toLowerCase().includes(query) ||
          conversation.lastMessage.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter((conversation) => {
      // Filter by tab
      if (activeTab === "all") return true;
      if (activeTab === "unread") return conversation.unreadCount > 0;
      return false;
    });

  const handleSelectConversation = (conversationId) => {
    if (onSelectConversation) {
      onSelectConversation(conversationId);
    }
  };

  return (
    <div className={`flex flex-col h-full border rounded-lg ${className}`}>
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-4">Messages</h2>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              Unread
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100%-50px)]">
            {filteredConversations.length > 0 ? (
              <div className="divide-y">
                {filteredConversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    className={`w-full h-auto p-3 justify-start ${
                      activeConversationId === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <Avatar className="h-10 w-10 flex-shrink-0">
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
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-start">
                          <span
                            className={`text-sm ${conversation.unreadCount > 0 ? "font-semibold" : ""}`}
                          >
                            {conversation.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(
                              new Date(conversation.lastMessageTime),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">
                            {conversation.type === "supplier"
                              ? "Supplier"
                              : "Buyer"}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <Badge
                              variant="default"
                              className="text-xs h-5 px-1.5"
                            >
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <UserIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">
                  {searchQuery
                    ? "No matching conversations"
                    : "No conversations yet"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {searchQuery
                    ? "Try a different search term"
                    : "Start a conversation with a supplier"}
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link to="/messages/new">New Message</Link>
        </Button>
      </div>
    </div>
  );
}
