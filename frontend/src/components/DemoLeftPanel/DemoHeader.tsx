import logo from "@/resources/leaf.png";
import { FC } from "react";

interface DemoHeaderProps {
  title: string;
}

const DemoHeader: FC<DemoHeaderProps> = ({ title }: DemoHeaderProps) => (
  <header className="flex flex-row justify-start items-center text-sm p-[10px] gap-[10px] bg-[color:var(--primary-dark)]">
    <img className="max-h-[20px]" src={logo} alt="" />
    <h2>{title}</h2>
  </header>
);

export default DemoHeader;
