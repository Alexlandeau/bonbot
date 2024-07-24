import { FC } from "react";

interface DemoChatEmptyStateProps {
  placeholder: string;
  logo: any;
}

const DemoChatEmptyState: FC<DemoChatEmptyStateProps> = ({
  placeholder,
  logo,
}) => (
  <div className="flex flex-col flex-grow overflow-auto gap-4 justify-center">
    <img className="h-[50px] self-center" src={logo} alt="" />
    <div className="text-lg font-medium self-center text-[color:var(--secondary-light)]">
      {placeholder}
    </div>
  </div>
);

export default DemoChatEmptyState;
