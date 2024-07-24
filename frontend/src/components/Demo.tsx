import { FC } from "react";
import DemoHeader from "@/components/DemoLeftPanel/DemoHeader";
import DemoInstructions from "@/components/DemoLeftPanel/DemoInstructions";
import DemoChat from "@/components/DemoChat/DemoChat";
import userPicture from "@/resources/user_pictures/user.svg";
import botPicture from "@/resources/user_pictures/bot.png";
import { UiSettings } from "@/types";

interface DemoProps {
  uiSettings?: UiSettings;
  customClassName?: string;
}

export const defaultUiSettings: UiSettings = {
  header: {
    title: "Chatbot Demo",
  },
  chat: {
    endpoint: "demo",
    placeholder: "Type your message here",
    sourcePlaceholder: "",
    senderUser: {
      name: "You",
      pic: userPicture,
      hsl_color: {
        h: 152,
        s: 23,
        l: 27,
      }, // GSK Medium dark Green
    },
    botUser: {
      name: "Demo Bot",
      pic: botPicture,
      hsl_color: {
        h: 163,
        s: 45,
        l: 16,
      }, // GSK Dark Green
    },
  },
};

const Demo: FC<DemoProps> = ({ uiSettings, customClassName }) => {
  uiSettings = uiSettings || defaultUiSettings;

  return (
    <>
      <div className={`flex-shrink-0 overflow-auto w-[40%] ${customClassName}`}>
        <DemoHeader {...uiSettings.header} />
        <DemoInstructions {...uiSettings.instructions} />
      </div>
      <div
        className={`flex flex-col flex-grow border-l border-[color:var(--primary-medium-dark)]  ${customClassName}`}
        // TODO: Remove this style after applying tailwind base
        style={{
          borderLeft: "1px solid var(--primary-medium-dark)",
        }}
      >
        <DemoChat {...uiSettings.chat} />
      </div>
    </>
  );
};

export default Demo;
