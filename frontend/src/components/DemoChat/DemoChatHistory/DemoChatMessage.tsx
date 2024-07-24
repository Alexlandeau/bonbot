import { FC } from "react";
import { ChatMessage } from "../DemoChat";
import Markdown from "react-markdown";

interface DemoChatMessageProps {
  chatMessage: ChatMessage;
  sourcePlaceholder: string;
}

const DemoChatMessage: FC<DemoChatMessageProps> = ({
  chatMessage,
  sourcePlaceholder,
}) => (
  <div className="flex flex-row gap-2">
    <div
      className="w-5 h-5 rounded-full flex flex-shrink-0 justify-center items-center p-2"
      style={{
        backgroundColor: `hsl(${chatMessage.sender.hsl_color.h}, ${chatMessage.sender.hsl_color.s}%, ${chatMessage.sender.hsl_color.l}%)`,
        boxShadow: `inset 0 0 0 1px hsl(${chatMessage.sender.hsl_color.h}, ${
          chatMessage.sender.hsl_color.s
        }%, ${chatMessage.sender.hsl_color.l + 10}%)`,
      }}
    >
      <img
        className="w-full h-full"
        src={chatMessage.sender.pic}
        alt={chatMessage.sender.name}
      />
    </div>
    <div
      className={`flex flex-col flex-grow gap-1 p-2 ${
        chatMessage.messageType === "ERROR"
          ? "bg-[hsl(0,100%,20%)] border border-[hsl(0,100%,50%)]"
          : ""
      }`}
      // TODO: Remove this style after applying tailwind base
      style={
        chatMessage.messageType === "ERROR"
          ? {
              backgroundColor: "hsl(0, 100%, 20%)",
              border: "1px solid hsl(0, 100%, 50%)",
            }
          : {}
      }
    >
      <span className="font-bold">{chatMessage.sender.name}</span>
      <Markdown>{chatMessage.message}</Markdown>
      {chatMessage.recos && chatMessage.recos.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span>
            <i>Voir plus en détails:</i>
          </span>
          {chatMessage.recos.map((reco, i) => {
            return (
              <div className="!flex gap-4 justify-between" key={i}>
                <span>{reco.name}</span>
                {/* Add the next span label to the button */}
                <button className="flex-none w-[200px]">
                  {sourcePlaceholder + " " + reco.source.toLowerCase()}
                </button>
              </div>
            );
          })}
        </div>
      ) : undefined}
    </div>
  </div>
);

export default DemoChatMessage;
