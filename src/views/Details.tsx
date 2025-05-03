import { JSX, lazy, memo, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import FormList from "../components/FormList";

type ComponentsType = {
    [key: string]: JSX.Element
};
const Components: ComponentsType = ['Input', 'Select', 'Button']
    .reduce((acc, cur) => ({
        ...acc,
        [cur]: memo(lazy(() => import(`../components/${cur}`)))
    }), {});

function Details() {
    const [editing, setEditing] = useState(false);
    const [params, _] = useSearchParams();

    const { title, fields, collection } = useMemo(() => ({
        title: params.get('title') ?? '',
        collection: params.get('collection'),
        fields: JSON.parse(params.get('fields') ?? '[]')
            .map(({ type, ...props }: any) => ({
                ...props,
                type: Components[type]
            }))
    }
    ), [params]);

    function handleSubmit(data: any) {
        if (!editing) {
            setEditing(true);
            return;
        }
    }

    return (
        <FormList
            title={title}
            fields={fields.map((f: any) => ({ ...f, disabled: !editing }))}
            onSubmit={collection ? handleSubmit : undefined}
            submitText={editing ? "Salvar" : "Editar"}
        />
    );
}

export default Details;