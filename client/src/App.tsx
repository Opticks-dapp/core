import { useState } from "react";
import GraphBT from "./components/GraphBT";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-4xl">hi hello</h1>
      <button onClick={() => setCount((p) => p + 1)}>{count}</button>
      <GraphBT/>
    </>
  );
}
