import { EXECUTION_CONTEXT } from "./context";
import { Running, Subscriptions, SubscribedFn } from "./types";

function cleanup(running: Running) {
  for (const dep of running.signalSubscriptionsBacklink) {
    dep.delete(running.effect);
  }

  running.signalSubscriptionsBacklink.clear();
}

export function subscribeToSignal(signalSubscriptions: Subscriptions, running: Running) {
  // add the current effect function to the signals subscription list
  signalSubscriptions.add(running.effect);

  // store the subscription list of each signal for an update cycle in the context
  running.signalSubscriptionsBacklink.add(signalSubscriptions);
}

export function createEffect(fn: SubscribedFn) {
  (function execute() {

    const running: Running = {
      effect: execute,
      signalSubscriptionsBacklink: new Set() as Running['signalSubscriptionsBacklink']
    };

    /* Every cycle we unsubscribe the Reaction/effect from all its Signals and 
    clear the dependency list to start new */
    cleanup(running);

    EXECUTION_CONTEXT.context.push(running);

    try {
      fn();
    } finally {
      EXECUTION_CONTEXT.context.pop();
    }
  }());
}
