import { useNavigate } from "react-router";
import { FormProps } from "../components/FormList";
import { buildURLParams } from "../utils";

type OpenViewProps = {
    title: string;
    collection?: string;
    fields: FormProps['fields'];
}

const useView = (name: string) => {
    const navigate = useNavigate();
    return (obj: OpenViewProps) =>
        navigate(`/${name}?` + buildURLParams(obj));
}

export default useView;