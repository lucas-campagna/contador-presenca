import { createResource, ResourceFetcher } from "solid-js";

type TFetcher<T = any, R = any> = (source: T) => R;

const baseKey = "resources";

const createLocalFirstFetcher = (
  key: string,
  fetcher: TFetcher
): ResourceFetcher<any, any, any> =>
  ((source, { refetching }) => {
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
  }) as ResourceFetcher<any, any, boolean>;

const createLocalFirstResource = (
  key: string,
  source: unknown,
  fetcher: TFetcher
) => createResource(source, createLocalFirstFetcher(key, fetcher));

export default createLocalFirstResource;
