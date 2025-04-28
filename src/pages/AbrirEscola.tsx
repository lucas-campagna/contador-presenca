import { useState } from "react";
import { Link } from "react-router-dom";

function AbrirEscola() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password1 !== password2) {
            setError('As senhas não são iguais');
            return;
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
            <h1 className="text-3xl font-bold mt-8">Presente!</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                    <span className="text-gray-700">Token</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="meu-email-favorito@dominio.com"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        placeholder="Sua senha aqui"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Sua senha aqui"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                </label>
                <div className="flex flex-col items-center justify-between gap-2">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-sky-500 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:border-sky-700 focus:ring-sky-700 disabled:opacity-25 transition"
                    >
                        Abrir
                    </button>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </form>
            <div className="items-center p-4 text-gray-900 capitalize">
                <Link
                    to="/login"
                >
                    Voltar
                </Link>
            </div>

        </div>
    )

}
export default AbrirEscola;