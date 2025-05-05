import { JSX } from "react";

type ListItemPropsType = {
  children: JSX.Element | JSX.Element[];
};

function ListContainer({ children }: ListItemPropsType) {
  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <div className="flex flex-col items-stretch gap-2 min-w-full sm:min-w-xl">{children}</div>
    </div>
  );
}

export default ListContainer;