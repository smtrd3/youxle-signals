import { createElement } from "./element";
import { createMemo } from "./primitives";
import { createSignal } from "./signal";


export function App() {
  const [firstName, setFirstName] = createSignal("John");
  const [lastName, setLastName] = createSignal("Doe");
  const [counter, setCounter] = createSignal(1);

  const onFirstNameChange = (e: Event) => {
    setFirstName((e.target as HTMLInputElement).value);
  }

  const onLastNameChange = (e: Event) => {
    setLastName((e.target as HTMLInputElement).value);
  }

  const fullName = createMemo(() => {
    return firstName() + ' ' + lastName();
  });

  setInterval(() => {
    setCounter(counter() + 1);
  }, 1000);

  /*
    <div>
      <div style="...">
        <input value="..." oninput="..." style="...">
        <input value="..." oninput="..." style="...">
      </div>
      <div>...</div>
    </div>
    
    The following code is equivalent in structure to the above JSX pseudo code
  */
  return createElement('div', {}, [
    () => createElement('div', { style: () => "display: flex; gap: 5px" }, [
      () => createElement('input', {
        value: firstName,
        input: () => onFirstNameChange,
        style: () => "padding: 5px",
      }),
      () => createElement('input', {
        value: lastName,
        input: () => onLastNameChange,
        style: () => "padding: 5px"
      }),
    ]),
    () => createElement('div', {}, [() => "Full name: ", fullName, () => ` Counter: ${counter()}`])
  ]);
}

function renderApp() {
  const host = document.getElementById('app');
  host?.appendChild(App());
}

renderApp();