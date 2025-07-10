import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareIcon } from "lucide-react";
import Breadcrumb from "@/polymet/components/breadcrumb";
import MessagesList from "@/polymet/components/messages-list";
import MessageConversation from "@/polymet/components/message-conversation";

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Mock data
  const currentUser = {
    id: "user-1",
    name: "John Smith",
    image: "https://github.com/yusufhilmi.png",
  };

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
      status: "Offline",
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
      status: "Online",
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
      status: "Away",
    },
  ];

  const messagesData = {
    "conv-1": [
      {
        id: "msg-1",
        senderId: "supplier-1",
        content:
          "Hello! Thank you for your interest in our products. How can we help you today?",
        timestamp: "2023-06-09T10:15:00Z",
      },
      {
        id: "msg-2",
        senderId: "user-1",
        content:
          "Hi there! I'm looking for information about your custom manufacturing options for electronic components.",
        timestamp: "2023-06-09T10:20:00Z",
      },
      {
        id: "msg-3",
        senderId: "supplier-1",
        content:
          "We offer a range of custom manufacturing services for electronic components. Could you please provide more details about your specific requirements?",
        timestamp: "2023-06-09T10:25:00Z",
      },
      {
        id: "msg-4",
        senderId: "user-1",
        content:
          "I need custom PCBs for an IoT device we're developing. I'm looking for a supplier who can handle small to medium batch sizes with quick turnaround times.",
        timestamp: "2023-06-09T10:30:00Z",
      },
      {
        id: "msg-5",
        senderId: "supplier-1",
        content:
          "We can definitely help with that. Our minimum order quantity for custom PCBs is 50 units, and our standard turnaround time is 7-10 business days. We can also offer expedited services if needed.",
        timestamp: "2023-06-09T10:35:00Z",
        attachment: {
          name: "PCB_Manufacturing_Capabilities.pdf",
        },
      },
      {
        id: "msg-6",
        senderId: "user-1",
        content:
          "That sounds promising. What about pricing? Do you offer volume discounts?",
        timestamp: "2023-06-10T09:15:00Z",
      },
      {
        id: "msg-7",
        senderId: "supplier-1",
        content:
          "Yes, we offer tiered pricing based on volume. For orders over 200 units, we provide a 10% discount, and for orders over 500 units, the discount increases to 15%.",
        timestamp: "2023-06-10T09:20:00Z",
      },
    ],

    "conv-2": [
      {
        id: "msg-1",
        senderId: "supplier-2",
        content:
          "Thank you for your recent order #38290. We wanted to inform you about a slight delay in processing due to high demand.",
        timestamp: "2023-06-09T10:15:00Z",
      },
      {
        id: "msg-2",
        senderId: "user-1",
        content:
          "Thanks for letting me know. How long do you expect the delay to be?",
        timestamp: "2023-06-09T10:30:00Z",
      },
      {
        id: "msg-3",
        senderId: "supplier-2",
        content:
          "We anticipate a delay of approximately 3-5 business days. We apologize for any inconvenience this may cause.",
        timestamp: "2023-06-09T10:45:00Z",
      },
      {
        id: "msg-4",
        senderId: "user-1",
        content: "That should be fine. Please keep me updated on the status.",
        timestamp: "2023-06-09T11:00:00Z",
      },
    ],
  };

  const breadcrumbItems = [{ label: "Messages" }];

  const activeConversation =
    conversations.find((conv) => conv.id === activeConversationId) || null;
  const activeMessages = activeConversationId
    ? messagesData[activeConversationId] || []
    : [];

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);

    // In a real app, this would mark messages as read
    console.log("Selected conversation:", conversationId);
  };

  const handleSendMessage = (message) => {
    // In a real app, this would send the message to the API
    console.log(
      "Sending message:",
      message,
      "to conversation:",
      activeConversationId
    );
  };

  return (
    <div className="container py-6">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <Tabs defaultValue="messages" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <Button asChild>
              <Link to="/messages/new">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                New Message
              </Link>
            </Button>
          </div>

          <TabsContent value="messages" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <MessagesList
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  onSelectConversation={handleSelectConversation}
                  className="h-[calc(100vh-220px)]"
                />
              </div>

              <div className="md:col-span-2">
                <MessageConversation
                  conversation={activeConversation}
                  messages={activeMessages}
                  currentUser={currentUser}
                  onSendMessage={handleSendMessage}
                  className="h-[calc(100vh-220px)]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inquiries" className="mt-0">
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg">
              <div className="bg-muted rounded-full p-6 inline-block mb-4">
                <MessageSquareIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Product Inquiries</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                View and respond to inquiries about your products from potential
                buyers
              </p>
              <Button>View Inquiries</Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg">
              <div className="bg-muted rounded-full p-6 inline-block mb-4">
                <MessageSquareIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Message Notifications
              </h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Manage your notification preferences for messages and inquiries
              </p>
              <Button>Notification Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8">
        <Separator />

        <div className="py-6">
          <h3 className="text-lg font-medium mb-4">
            Tips for Effective Communication
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Be Clear and Specific</h4>
              <p className="text-sm text-muted-foreground">
                Clearly state your requirements, quantities, and specifications
                to get accurate responses.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Respond Promptly</h4>
              <p className="text-sm text-muted-foreground">
                Timely responses help build trust and keep business discussions
                moving forward.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Keep Records</h4>
              <p className="text-sm text-muted-foreground">
                Save important conversations for reference in future
                negotiations or orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
