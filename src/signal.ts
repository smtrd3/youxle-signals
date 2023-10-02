import { EXECUTION_CONTEXT } from "./context";
import { subscribeToSignal } from "./effects";
import { Accessor, Setter, SubscribedFn } from "./types";

export function createSignal<T>(value?: T): [Accessor<T>, Setter<T>] {
  const subscriptions = new Set<SubscribedFn>();

  const read = () => {
    const executingEffect = EXECUTION_CONTEXT.context.at(-1);

    /* executing effect will subscribe to the signal on read operation */
    if (executingEffect) {
      subscribeToSignal(subscriptions, executingEffect);
    }

    return value as T;
  };

  const write = (nextValue?: T) => {
    value = nextValue;

    // all the subscribed effects will be called when signal value is changed
    subscriptions.forEach(effect => {
      effect();
    });
  };

  return [read, write];
}
