import { FC } from "react";
import { ChatMessage } from "../DemoChat";
import DemoChatMessage from "./DemoChatMessage";

interface DemoChatHistoryProps {
  chatHistory: ChatMessage[];
  sourcePlaceholder: string;
}

const DemoChatHistory: FC<DemoChatHistoryProps> = (props) => (
  <div className="flex flex-col flex-grow overflow-auto gap-8 px-4 ">
    {props.chatHistory.map((chatMessage, i) => {
      return (
        <DemoChatMessage
          chatMessage={chatMessage}
          sourcePlaceholder={props.sourcePlaceholder}
          key={i}
        />
      );
    })}
  </div>
);

export default DemoChatHistory;
