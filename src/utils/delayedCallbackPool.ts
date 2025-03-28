const defaultDelay = 5_000;

type CallbackType<T = any, R = any> = (d: T[]) => R;

type TCallbackPool<T = any, R = any> = {
  check?: (d: T) => boolean;
  call: (d: T) => R;
};
export function createDelayedCallbackPools(
  callbacks: TCallbackPool | TCallbackPool[],
  delay: number | undefined = undefined
) {
  if (!Array.isArray(callbacks)) {
    callbacks = [callbacks];
  }
  return callbacks.map((callback) => {
    const pool = new DelayedCallbackPool(callback.call, delay);
    return (d: any) =>
      !callback.check ? pool.call(d) : callback.check(d) && pool.call(d);
  });
}

// This class delays the call of a function by appending its args into a list and calling it after "delay" just once with all args on the list
class DelayedCallbackPool<T> {
  #clock: number = 0;
  #args: T[] = [];
  #resolvers: any[] = [];
  #delay: number = defaultDelay;
  #callback: CallbackType = () => null;
  constructor(callback: CallbackType, delay: number = defaultDelay) {
    console.assert(!!callback && delay > 0);
    this.#callback = callback;
    this.#delay = delay;
  }
  call(data: any) {
    this.#args.push(data);
    clearTimeout(this.#clock);
    return new Promise((r) => {
      this.#resolvers.push(r);
      this.#clock = setTimeout(() => {
        const result = this.#callback(this.#args);
        this.#resolvers.forEach((r) => r(result));
        this.#resolvers.splice(this.#resolvers.length);
        this.#args.splice(this.#args.length);
        this.#clock = 0;
      }, this.#delay);
    });
  }
}

export default DelayedCallbackPool;
