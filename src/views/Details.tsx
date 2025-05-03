import { JSX, lazy, memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import FormList from "../components/FormList";
import Aluno from "../models/aluno";
import Classe from "../models/classe";
import Professor from "../models/professor";
import Input from "../components/Input";
import { capitalize } from "../utils";

type FieldType = {
    [key: string]: any;
}

type ComponentsType = {
    [key: string]: JSX.Element
};
const Components: ComponentsType = ['Input', 'Select', 'Button']
    .reduce((acc, cur) => ({
        ...acc,
        [cur]: memo(lazy(() => import(`../components/${cur}`)))
    }), {});

const Collections = {
    alunos: Aluno,
    professores: Professor,
    classes: Classe,
}

function Details() {
    const [fields, setFields] = useState<FieldType[]>([]);
    const [editing, setEditing] = useState(false);
    const [params, _] = useSearchParams();
    const navigate = useNavigate();
    const [ref, setRef] = useState<any>(null);

    const { title, id, collection } = useMemo(() => ({
        title: params.get('title') ?? '',
        id: params.get('id'),
        collection: params.get('collection') ?? '',
    }
    ), [params]);

    const model = useMemo(() => Collections[collection as keyof typeof Collections], [collection]);

    useEffect(() => {
        if (!id || !(collection in Collections)) {
            navigate('/');
        }

        async function fetchData() {
            const doc = await model.get(id as string);
            if (!doc) {
                navigate(-1);
            }
            const fields = Object.entries(doc)
                .filter(([k]) => k !== 'ref')
                .map(([name, value]) => ({
                    name: name.toLowerCase().trim().replace(/\s+/g, '-'),
                    label: capitalize(name),
                    value,
                }));
            setRef(doc.ref);
            setFields(fields);
        }

        fetchData();
    }, [id, collection]);

    async function handleSubmit(data: any) {
        if (!editing) {
            setEditing(true);
            return;
        }
        const m = await model.build({...data, ref});
        await m.push();
        navigate(-1);
    }

    return (
        <FormList
            title={title}
            fields={fields.map((f: any) => ({ ...f, type: Input, disabled: !editing }))}
            onSubmit={(id && collection) ? handleSubmit : undefined}
            submitText={editing ? "Salvar" : "Editar"}
        />
    );
}

export default Details;