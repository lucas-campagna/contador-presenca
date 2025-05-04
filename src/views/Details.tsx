import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import FormList from "../components/FormList";
import Aluno from "../models/aluno";
import Classe from "../models/classe";
import Professor from "../models/professor";
import Input from "../components/Input";
import { capitalize } from "../utils";
import Button from "../components/Button";
import useView from "../hooks/useView";
import Base from "../models/base";
import { InvalidType } from "../errors";

type FieldType = {
    [key: string]: any;
}

export type ParamsType = {
    id: string;
    collection: string;
    title?: string;
}

type CollectionsType = {
    collection?: string;
    title?: string;
    type?: typeof Base;
}
const Collections: CollectionsType[] = [
    { collection: 'alunos', type: Aluno, title: 'aluno' },
    { collection: 'professores', type: Professor, title: 'professor' },
    { collection: 'classes', type: Classe, title: 'classe' },
]
const searchCollection = (s: CollectionsType): CollectionsType => (
    s.collection ? Collections.filter(c => c.collection === s.collection)?.[0] :
        s.type ? Collections.filter(c => c.type === s.type)?.[0] :
            Collections.filter(c => c.title === s.title)?.[0]
)
function isModel(value: any) {
    return Collections.some(({ type }) => type === value) ?? false;
}

function Details() {
    const [fields, setFields] = useState<FieldType[]>([]);
    const [editing, setEditing] = useState(false);
    const [ref, setRef] = useState<any>(null);
    const [params, _] = useSearchParams();
    const navigate = useNavigate();
    const gotoDetailsView = useView('detalhes');

    const { title, id, collection } = useMemo(() => ({
        title: params.get('title') ?? '',
        id: params.get('id'),
        collection: params.get('collection') ?? '',
    }
    ), [params]);

    const Model = useMemo(() => searchCollection({ collection }).type, [collection]);

    useEffect(() => {
        if (!Model || !id || !Collections.some(({ collection: c }) => c === collection)) {
            navigate('/');
            return;
        }

        async function fetchData() {
            const doc = await (Model as typeof Base).get(id as string);
            if (!doc) {
                navigate(-1);
                return;
            }
            try {
                await doc.pull();
            } catch { }

            function buildFields(value: any) {
                if (typeof value === 'string') {
                    return { value, type: Input };
                }
                if (Array.isArray(value)) {
                    return {
                        type: Button,
                        _type: 'button',
                        disabled: false,
                        onClick: () => {

                        }
                    }
                }
                if (isModel(value)) {
                    return {
                        type: Button,
                        _type: 'button',
                        disabled: false,
                        onClick: () => {
                            const result = searchCollection({ type: value });
                            if (!result) {
                                navigate(-1);
                                throw InvalidType();
                            }
                            gotoDetailsView({ title: result.title, id: value.ref.id, collection: result.collection })
                        }
                    }
                }
                if (typeof value === 'object') {
                    return {
                        type: Input,
                        value: value.value ?? ''
                    };
                }
                navigate(-1);
                throw InvalidType(value);
            }
            const fields = Object.entries(doc)
                .filter(([k]) => k !== 'ref')
                .map(([name, value]) => ({
                    name: name.toLowerCase().trim().replace(/\s+/g, '-'),
                    label: capitalize(name),
                    ...buildFields(value),
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
        const m = await (Model as typeof Base).build({ ...data, ref });
        await m.push();
        navigate(-1);
    }


    function handleCancel() {
        setEditing(false);
    }

    return (
        <FormList
            title={title}
            fields={fields.map((f: any) => ({ disabled: !editing, ...f }))}
            onSubmit={(id && collection) ? handleSubmit : undefined}
            onCancel={editing ? handleCancel : undefined}
            submitText={editing ? "Salvar" : "Editar"}
        />
    );
}

export default Details;