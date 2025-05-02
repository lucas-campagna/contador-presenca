import { ThreeBarsIcon } from "@primer/octicons-react";

type HeaderPropsType = {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderPropsType) => (
  <div className="flex flex-row items-center justify-between bg-primary w-full relative p-2 min-h-10">
    <div
      className="flex flex-row items-center justify-start text-white p-2 absolute left-0"
      onClick={onMenuClick}
    >
      <ThreeBarsIcon size={24} />
    </div>
  </div>
);

export default Header;
