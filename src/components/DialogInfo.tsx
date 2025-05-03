import Button, { ButtonProps } from "./Button";

type CardInfoPropsType = {
  header: string;
  body: string[];
  actions: ButtonProps[];
};

function CardInfo({ header, body, actions }: CardInfoPropsType) {
  return (
    <div className="">
      <div className="font-bold mb-2 uppercase">{header}</div>
      <div className="flex flex-col gap-1 py-3">
        {body.map((label) => (
          <div className="text-gray-400">{label}</div>
        ))}
      </div>
      <div className="mt-2">
        {actions.map((props) => (
          <Button {...props} />
        ))}
      </div>
    </div>
  );
}

export default CardInfo;
