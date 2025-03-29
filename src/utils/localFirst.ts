import { Accessor, createResource, ResourceFetcher, ResourceReturn, ResourceSource } from "solid-js";

type TFetcher<S, T> = typeof createResource<S, T>['arguments']['fetcher'];
type TSources<S, T> = {
  [key: string]: TFetcher<S, T>;
};

const baseKey = "tables";

const createLocalFirstFetcher =
  <S, T>(
    key: string,
    fetcher: TFetcher<S, T>
  ): ResourceFetcher<S, T, boolean> =>
  (source, { refetching }) => {
    const accessKey = `${baseKey}::${key}`;
    const downloadAndUpdateLocalData = async () => {
      const result = (await fetcher(source)) ?? null;
      localStorage.setItem(accessKey, JSON.stringify(result));
      return result;
    };
    if (refetching) {
      return downloadAndUpdateLocalData();
    }
    const localData = JSON.parse(localStorage.getItem(accessKey) ?? "null");
    if (localData) {
      return localData;
    }
    return downloadAndUpdateLocalData();
  };
const createLocalFirstResource = <S, T>(
  key: string,
  source: S,
  fetcher: TFetcher<S, T>
) => createResource(source, createLocalFirstFetcher(key, fetcher));

export const createLocalFirstResources = <S, T>(source: S, sources: TSources<S, T>) =>
  Object.fromEntries(
    Object.entries(sources).map(([name, callback]) => [
      name,
      createLocalFirstResource(name, source, callback),
    ])
  );

export default createLocalFirstResource;
