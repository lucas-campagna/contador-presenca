import { useSearchParams } from "@solidjs/router";
import { createSignal, Accessor } from "solid-js";

export type TCredentials = {
  deploymentId?: string;
  token?: string;
};

function useLogin(): Accessor<TCredentials> {
  const [searchParams] = useSearchParams();
  const localCode = localStorage.getItem("code");
  const [credentials, setCredentials] = createSignal<TCredentials>({});

  if (searchParams.code) {
    const [deploymentId, token] = ((searchParams.code as string) ?? "").split(
      ":"
    );
    localStorage.setItem("code", JSON.stringify([deploymentId, token]));
    setCredentials({ deploymentId, token });
  } else if (localCode) {
    const [deploymentId, token] = JSON.parse(localCode);
    setCredentials({ deploymentId, token });
  }
  return credentials;
}

export default useLogin;
