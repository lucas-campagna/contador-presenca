import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Login() {
  const [nTries, setNTries] = useState(0);
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const { token: paramToken } = useParams();

  async function tryLogin(token: string) {
    setToken('');
    setTimeout(async () => {
      console.log('Trying to login with token', token);
      setNTries(n => Math.min(n + 1, 3));
      try {
        await login(token);
        navigate('/');
      } catch (err) {
        setError((err as Error).message)
      }
    }, 1_000 * nTries);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    tryLogin(token);
  }

  useEffect(() => {
    console.log('User changed', user);
    if (user) {
      console.log('User found, redirecting to home')
      navigate('/')
    }
    if (paramToken) {
      tryLogin(paramToken);
    }
  }, [user, paramToken]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <h1 className="text-3xl font-bold mt-8">Presente!</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block">
          <span className="text-gray-700">Token</span>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Cole seu código aqui"
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
            Log in
          </button>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </form>
      <div className="items-center p-4 text-gray-900 capitalize">
        <Link
          to="/abrir-escola"
        >
          Abrir Escola
        </Link>
      </div>

    </div>
  )
}
