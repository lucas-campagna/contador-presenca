import { useNavigate } from "react-router";
import { buildURLParams } from "../utils";

const useView = (name: string) => {
    const navigate = useNavigate();
    return (obj: any) =>
        navigate(`/${name}?` + buildURLParams(obj));
}

export default useView;