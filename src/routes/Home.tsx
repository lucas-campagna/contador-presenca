import { createEffect } from "solid-js";
import useSheet from "../hooks/useSheet";

function Home(){
    const sheet = useSheet();
    createEffect(() => {
        sheet.get('alunos');
    });
    return <>Home</>;
}
export default Home;