import React, { FC } from "react";
import DemoChatEmptyState from "./DemoChatEmptyState";
import DemoChatQueryInput from "./DemoChatQueryInput/DemoChatQueryInput";
import DemoChatHistory from "./DemoChatHistory/DemoChatHistory";
import { User } from "@/types";

interface DemoChatProps {
  endpoint: string;
  placeholder: string;
  sourcePlaceholder: string;
  senderUser: User;
  botUser: User;
}

interface ChatResponse {
  response: {
    content: string;
    role: string;
  };
  metadata?: {
    products: any[];
    topic: string;
    offers: any[];
  };
}

enum ChatMessageType {
  ANSWER = "ANSWER",
  ERROR = "ERROR",
  QUERY = "QUERY",
}

type ChatMessageRecommendation = {
  name: string;
  source: string;
};

type ChatMessage = {
  message: string;
  sender: User;
  messageType: ChatMessageType;
  recos?: ChatMessageRecommendation[];
};

async function fetchChatResponse(
  query: string,
  endpoint: string
): Promise<ChatResponse> {
  // Post request to the server
  // The server will respond with a message
  const response = await fetch(
    (import.meta.env.VITE_BACKEND_URL ?? "") + `/api/${endpoint}/completion/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            content: query,
            role: "user",
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Add the ability to use ErrorState in the DemoChat component
const DemoChat: FC<DemoChatProps> = ({
  endpoint,
  placeholder,
  sourcePlaceholder,
  senderUser,
  botUser,
}) => {
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function submitQuery(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const query = form.query.value;
    const chatMessage: ChatMessage = {
      message: query,
      sender: senderUser,
      messageType: ChatMessageType.QUERY,
    };

    setChatHistory((chatHistory) => [...chatHistory, chatMessage]);
    form.reset();
    setIsLoading(true);
    fetchChatResponse(query, endpoint)
      .then((answer) => {
        const chatAnswer: ChatMessage = {
          message: answer.response.content,
          sender: botUser,
          messageType: ChatMessageType.ANSWER,
          recos:
            answer.metadata?.topic === "recommendation" &&
            answer.metadata.offers.length > 0
              ? answer.metadata.offers.map((offer) => ({
                  name: offer.libelle_pdt,
                  source: offer.offer_type,
                }))
              : undefined,
        };
        setIsLoading(false);
        setChatHistory((chatHistory) => [...chatHistory, chatAnswer]);
      })
      .catch((error) => {
        const chatError: ChatMessage = {
          message: error.message,
          sender: {
            name: "Error Bot",
            pic: botUser.pic,
            hsl_color: {
              h: 0,
              s: 100,
              l: 20,
            },
          },
          messageType: ChatMessageType.ERROR,
        };
        setChatHistory((chatHistory) => [...chatHistory, chatError]);
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col flex-grow overflow-hidden p-4 bg-[color:var(--secondary-medium-dark)]">
      {chatHistory.length === 0 ? (
        <DemoChatEmptyState placeholder={placeholder} logo={senderUser.pic} />
      ) : (
        <DemoChatHistory
          chatHistory={chatHistory}
          sourcePlaceholder={sourcePlaceholder}
        />
      )}
      <DemoChatQueryInput
        onSubmit={submitQuery}
        isLoading={isLoading}
        chatHistory={JSON.stringify(chatHistory)}
      />
    </div>
  );
};

export default DemoChat;
export type { ChatMessage };
