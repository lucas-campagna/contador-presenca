import { useState } from "react";
import useAuth from "../hooks/useAuth.tsx";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import { SignInProps, SignUpProps } from "../contexts/AuthContext.tsx";
import { NomeApp } from "../constants.tsx";
// import { useParams } from 'react-router-dom';

export default function Login() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();
  // TODO
  // const { token } = useParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, confirm } = Object.fromEntries(
      new FormData(e.currentTarget)
    );
    setError("");
    if (!email) {
      setError("Email não providenciado");
      return;
    }
    if (!password) {
      setError("Senha não providenciada");
      return;
    }
    if (isCreating && password !== confirm) {
      setError("Senhas diferindo");
      return;
    }
    try {
      if (isCreating) {
        await signUp({ email, password } as SignUpProps);
      } else {
        await signIn({ email, password } as SignInProps);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-20">
      <h1 className="text-3xl font-bold mt-8">{NomeApp}</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-start my-8 min-h-[230px] gap-4">
          <Input
            required
            name="email"
            label="E-mail"
            type="email"
            placeholder="meu.email@mail.com"
          />
          <Input
            required
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
          />
          {isCreating && (
            <Input
              required
              name="confirm"
              label="Confirma senha"
              type="password"
              placeholder="Sua senha de novo"
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <Button text={isCreating ? "Abrir" : "Entrar"} type="submit" />
          <p className="text-sm text-red-500 max-w-45">{error}</p>
        </div>
      </form>
      <div
        className="items-center p-4 text-gray-900 capitalize"
        onClick={() => setIsCreating((e) => !e)}
      >
        {isCreating ? "Voltar" : "Abrir escola"}
      </div>
    </div>
  );
}
