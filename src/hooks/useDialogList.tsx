import useDialog from "../hooks/useDialog";

export type TItems = {
  [key: string]: TItems | CallableFunction;
};

export type DialogListProps = {
  title?: string;
  items: TItems;
};

function DialogList({ title, items }: DialogListProps) {
  const { setDialog, clearDialog } = useDialog();
  function handleOnClick(name: string, action: TItems | CallableFunction) {
    if (typeof action === "function") {
      (action as CallableFunction)();
      clearDialog();
    } else {
      setDialog(<DialogList title={name} items={action as TItems} />);
    }
  }
  return (
    <>
      {title && (
        <div className="flex justify-start font-bold text-xl pb-4">{title}</div>
      )}
      <div className="flex flex-col gap-2">
        {Object.entries(items).map(([name, action], index) => (
          <div
            className="bg-sky-500 p-2 rounded-sm text-white"
            onClick={() => handleOnClick(name, action)}
            key={index}
          >
            {name}
          </div>
        ))}
      </div>
    </>
  );
}

const useDialogList = () => {
  const { setDialog, clearDialog } = useDialog();

  function openDialogList({ title, items }: DialogListProps) {
    setDialog(<DialogList title={title} items={items} />);
  }

  return {
    openDialogList,
    clearDialog,
  };
};

export default useDialogList;
