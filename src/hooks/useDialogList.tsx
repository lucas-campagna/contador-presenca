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
            setDialog(<DialogList title={name} items={action as TItems} />)
        }
    }
    return (
        <div className="flex flex-col justify-start items-strech p-3 bg-white rounded-sm shadow-sm gap-3">
            {title && <div className="flex items-center font-bold text-xl">{title}</div>}
            {
                Object.entries(items).map(([name, action], index) => (
                    <div
                        className="bg-sky-500 p-2 rounded-sm text-white"
                        onClick={() => handleOnClick(name, action)}
                        key={index}
                    >
                        {name}
                    </div>))
            }
        </div>
    );
}

const useDialogList = () => {
    const { setDialog, clearDialog } = useDialog();

    function openDialogList(title: string, items: TItems) {
        setDialog(<DialogList title={title} items={items} />);
    }

    return {
        openDialogList,
        clearDialog
    }
}

export default useDialogList;