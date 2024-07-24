export type User = {
  name: string;
  // url to user's profile picture
  pic: string;
  hsl_color: {
    h: number;
    s: number;
    l: number;
  };
};

export type ChatSettings = {
  endpoint: string;
  placeholder: string;
  sourcePlaceholder: string;
  senderUser: User;
  botUser: User;
};

export type HeaderSettings = {
  title: string;
};

export type InstructionSettings = {
  textBlock: JSX.Element;
};

export type UiSettings = {
  header: HeaderSettings;
  instructions?: InstructionSettings;
  chat: ChatSettings;
};
