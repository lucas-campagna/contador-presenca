import { createResource, ResourceFetcher } from "solid-js";

type TFetcher<S, T> = typeof createResource<S, T>['arguments']['fetcher'];
type TSources<S, T> = {
  [key: string]: TFetcher<S, T> & {fetcher: TFetcher<S, T>, initialValue: any};
};

const baseKey = "tables";

const createLocalFirstFetcher =
  <S, T>(
    key: string,
    fetcher: TFetcher<S, T>,
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
  fetcher: TFetcher<S, T>,
  initialValue?: any,
) => createResource(source, createLocalFirstFetcher(key, fetcher), {initialValue});

export const createLocalFirstResources = <S, T>(source: S, sources: TSources<S, T>) =>
  Object.fromEntries(
    Object.entries(sources).map(([name, fetcher]) => [
      name,
      fetcher.fetcher
      ? createLocalFirstResource(name, source, fetcher.fetcher, fetcher.initialValue)
      : createLocalFirstResource(name, source, fetcher),
    ])
  );

export default createLocalFirstResource;
