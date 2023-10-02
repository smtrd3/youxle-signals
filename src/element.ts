import { createEffect } from "./effects";
import { Accessor } from "./types";

export function createElement(
  elementName: keyof HTMLElementTagNameMap,
  props: Record<string, Accessor<any>> = {},
  children: (Accessor<HTMLElement | string>)[] = []) {
  const el = document.createElement(elementName);

  for (let [prop, propSignal] of Object.entries(props || {})) {
    createEffect(() => {
      const value = propSignal();
      if (typeof value === 'function') {
        el.addEventListener(prop, value);
      } else {
        el.setAttribute(prop, value);
      }
    });
  }

  createEffect(() => {
    const allChildren = children.map(ch => ch());
    el.replaceChildren(...allChildren as (string | Node)[]);
  });


  return el;
}