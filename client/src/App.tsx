import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>hi hello</h1>
      <button onClick={() => setCount((p) => p + 1)}>{count}</button>
    </>
  );
}
