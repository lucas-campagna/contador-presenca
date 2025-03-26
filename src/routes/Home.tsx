import { createResource, Match, Show, Switch } from "solid-js";
import useSheet from "../hooks/useSheet";
import useIsLoading from "../hooks/useIsloading";

function Home() {
    const setIsLoading = useIsLoading();
    (window as any).setIsLoading = setIsLoading;
    const sheet = useSheet();

    const [tables] = createResource(
        sheet,
        sheet => sheet?.tables?.(),
    );

    const [me] = createResource(
        sheet,
        sheet => sheet?.me?.() ?? {
            id: 'abc123',
            token: 'abc123',
            permission: 'admin',
        },
    );

    const hasData = [me, tables].reduce((acc, curr) => acc && !curr.loading && !curr.error, true);
    return (
        <Show when={hasData}>
            <Switch>
                <Match when={me()?.permission === 'admin'}>
                    Admin
                </Match>
                <Match when={me()?.permission === 'user'}>
                    User
                </Match>
            </Switch>
        </Show>
    )
}
export default Home;