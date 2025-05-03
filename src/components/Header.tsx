import { ThreeBarsIcon } from "@primer/octicons-react";
import { JSX } from "react";

type HeaderPropsType = {
    onMenuClick: () => void;
    leftIcon?: JSX.Element;
}

const Header = ({ onMenuClick, leftIcon }: HeaderPropsType) => (
  <div className="flex flex-row items-center justify-between bg-primary w-full relative p-2 min-h-10">
    <div
      className="flex flex-row items-center justify-start text-white p-2 absolute left-0"
      onClick={onMenuClick}
    >
      {leftIcon || <ThreeBarsIcon size={24} />}
    </div>
  </div>
);

export default Header;
