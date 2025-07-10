import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BellIcon,
  ChevronLeftIcon,
  MessageCircleIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  UsersIcon,
} from "lucide-react";

export default function DashboardMessagesPage() {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === "all" ||
        (activeTab === "unread" && conversation.unreadCount > 0))
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    console.log("Sending message:", messageText);
    setMessageText("");
    // In a real app, you would add the message to the conversation and send it to the server
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Dashboard sidebar would be here in the actual implementation */}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="h-5 w-5" />

              <h1 className="text-xl font-semibold">Messages</h1>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <PlusIcon className="h-4 w-4" />

                <span className="hidden sm:inline">New Message</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />

                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/yusufhilmi.png" />

                <AvatarFallback>YH</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard tabs */}
        <Tabs defaultValue="messages" className="flex-1 overflow-hidden">
          <div className="border-b bg-background px-6">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger
                value="messages"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Inquiries
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="messages" className="flex-1 overflow-y-auto p-0">
            <div className="flex h-full">
              {/* Conversations list */}
              <div className="w-80 border-r flex flex-col bg-background">
                <div className="p-4 border-b">
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

                <div className="p-2 border-b">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="unread" className="flex-1">
                        Unread
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 cursor-pointer hover:bg-accent ${
                          activeConversation?.id === conversation.id
                            ? "bg-accent"
                            : ""
                        }`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.image} />

                            <AvatarFallback>
                              {conversation.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm truncate">
                                {conversation.name}
                              </h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatRelativeTime(
                                  conversation.lastMessageTime
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No conversations found
                    </div>
                  )}
                </div>
              </div>

              {/* Conversation area */}
              {activeConversation ? (
                <div className="flex-1 flex flex-col">
                  {/* Conversation header */}
                  <div className="p-4 border-b flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setActiveConversation(null)}
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </Button>
                    <Avatar>
                      <AvatarImage src={activeConversation.image} />

                      <AvatarFallback>
                        {activeConversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-medium">{activeConversation.name}</h2>
                      <p className="text-xs text-muted-foreground">
                        {activeConversation.type === "supplier"
                          ? "Supplier"
                          : "Buyer"}
                        {" • "}
                        {activeConversation.status}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 block text-right mt-1">
                            {formatMessageTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <div className="p-4 border-t">
                    <form
                      onSubmit={handleSendMessage}
                      className="flex items-center gap-2"
                    >
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                      />

                      <Button type="submit" size="icon">
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircleIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Choose a conversation from the list or start a new one to
                      begin messaging.
                    </p>
                    <Button className="mt-4" onClick={() => {}}>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      New Conversation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="inquiries" className="p-6">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <UsersIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />

                <h3 className="text-lg font-medium">Inquiries Dashboard</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Manage your product and service inquiries here.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="p-6">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <BellIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />

                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  View and manage your notifications here.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Mock data
const conversations = [
  {
    id: "conv-1",
    name: "TechPro Industries",
    image: "https://github.com/polymet-ai.png",
    lastMessage:
      "We've received your inquiry about the custom manufacturing options and would like to discuss further details.",
    lastMessageTime: "2023-06-10T14:30:00Z",
    unreadCount: 3,
    type: "supplier",
    status: "Online",
    messages: [
      {
        id: "msg-1",
        sender: "other",
        content:
          "Hello! Thank you for your interest in our products. How can we help you today?",
        timestamp: "2023-06-09T10:15:00Z",
      },
      {
        id: "msg-2",
        sender: "user",
        content:
          "Hi there! I'm looking for information about your custom manufacturing options for electronic components.",
        timestamp: "2023-06-09T10:20:00Z",
      },
      {
        id: "msg-3",
        sender: "other",
        content:
          "We offer a range of custom manufacturing services for electronic components. Could you please provide more details about your specific requirements?",
        timestamp: "2023-06-09T10:25:00Z",
      },
      {
        id: "msg-4",
        sender: "user",
        content:
          "I need custom PCBs for an IoT device we're developing. I'm looking for a supplier who can handle small to medium batch sizes with quick turnaround times.",
        timestamp: "2023-06-09T10:30:00Z",
      },
      {
        id: "msg-5",
        sender: "other",
        content:
          "We can definitely help with that. Our minimum order quantity for custom PCBs is 50 units, and our standard turnaround time is 7-10 business days. We can also offer expedited services if needed.",
        timestamp: "2023-06-10T14:30:00Z",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Global Materials Co.",
    image: "https://github.com/polymet-ai.png",
    lastMessage:
      "Thank you for your recent order. We wanted to inform you about a slight delay in processing.",
    lastMessageTime: "2023-06-09T10:15:00Z",
    unreadCount: 0,
    type: "supplier",
    status: "Away",
    messages: [
      {
        id: "msg-1",
        sender: "other",
        content:
          "Thank you for your recent order #ORD-38290. We appreciate your business!",
        timestamp: "2023-06-08T09:15:00Z",
      },
      {
        id: "msg-2",
        sender: "other",
        content:
          "We wanted to inform you about a slight delay in processing your order due to high demand. We expect to ship within the next 48 hours.",
        timestamp: "2023-06-09T10:15:00Z",
      },
    ],
  },
  {
    id: "conv-3",
    name: "PackMaster Solutions",
    image: "https://github.com/polymet-ai.png",
    lastMessage:
      "Your quote request has been processed. Please find attached our detailed quotation for the packaging materials you inquired about.",
    lastMessageTime: "2023-06-08T16:45:00Z",
    unreadCount: 1,
    type: "supplier",
    status: "Online",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        content:
          "Hello, I'm interested in your corrugated shipping boxes. Could you provide a quote for 1000 units with custom printing?",
        timestamp: "2023-06-07T14:30:00Z",
      },
      {
        id: "msg-2",
        sender: "other",
        content:
          "Thank you for your interest! We'd be happy to provide a quote. Could you please specify the dimensions and any other requirements for the boxes?",
        timestamp: "2023-06-07T15:45:00Z",
      },
      {
        id: "msg-3",
        sender: "user",
        content:
          'We need 12" x 10" x 8" boxes with our company logo printed on two sides. The logo is single color (black).',
        timestamp: "2023-06-08T09:20:00Z",
      },
      {
        id: "msg-4",
        sender: "other",
        content:
          "Your quote request has been processed. Please find attached our detailed quotation for the packaging materials you inquired about.",
        timestamp: "2023-06-08T16:45:00Z",
      },
    ],
  },
  {
    id: "conv-4",
    name: "SafetyFirst Equipment",
    image: "https://github.com/polymet-ai.png",
    lastMessage:
      "We're following up on your recent purchase of safety helmets. How satisfied are you with the products?",
    lastMessageTime: "2023-06-07T09:20:00Z",
    unreadCount: 0,
    type: "supplier",
    status: "Offline",
    messages: [
      {
        id: "msg-1",
        sender: "other",
        content:
          "We're following up on your recent purchase of safety helmets. How satisfied are you with the products?",
        timestamp: "2023-06-07T09:20:00Z",
      },
    ],
  },
  {
    id: "conv-5",
    name: "MachineWorks Ltd.",
    image: "https://github.com/polymet-ai.png",
    lastMessage:
      "The maintenance manual for your recently purchased equipment is now available for download in your account.",
    lastMessageTime: "2023-06-05T11:10:00Z",
    unreadCount: 0,
    type: "supplier",
    status: "Online",
    messages: [
      {
        id: "msg-1",
        sender: "other",
        content:
          "The maintenance manual for your recently purchased equipment is now available for download in your account.",
        timestamp: "2023-06-05T11:10:00Z",
      },
    ],
  },
];

// Helper functions
function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function formatMessageTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
