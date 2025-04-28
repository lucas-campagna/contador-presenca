import { useSearchParams } from "@solidjs/router";
import { createSignal, Accessor, createEffect } from "solid-js";

export type TCredentials = {
  deploymentId?: string;
  token?: string;
};

function useLogin(): Accessor<TCredentials> {
  const [searchParams] = useSearchParams();
  const localCode = localStorage.getItem("code");
  const [credentials, setCredentials] = createSignal<TCredentials>({});

  createEffect(() => {
    const deploymentId = searchParams.deploymentId as string;
    const token = searchParams.token as string;
    
    if (deploymentId && token) {
      localStorage.setItem("code", JSON.stringify({ deploymentId, token }));
      setCredentials({ deploymentId, token });
    } else if (localCode) {
      const { deploymentId, token } = JSON.parse(localCode);
      setCredentials({ deploymentId, token });
    }
  });
  return credentials;
}

export default useLogin;
