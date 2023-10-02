import { EXECUTION_CONTEXT } from "./context";
import { createEffect } from "./effects";
import { createSignal } from "./signal";

export function createMemo<T>(fn: () => T) {
  const [s, set] = createSignal<T>();
  createEffect(() => set(fn()));
  return s;
}

export function untrack<T>(fn: () => T) {
  const contextBackup = EXECUTION_CONTEXT.context;
  EXECUTION_CONTEXT.context = [];
  const returnValue = fn();
  EXECUTION_CONTEXT.context = contextBackup;
  return returnValue;
}
