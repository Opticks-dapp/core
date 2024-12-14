import { useRef, useState } from "react";
import Icon from "../components/Icon";
import { twMerge } from "tailwind-merge";

export default function () {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const [selectedTool, setSelectedTool] = useState(0);

  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  function generateResponse() {
    if (!textareaRef.current) return;
    setLoading(true);
    fetch("http://127.0.0.1:9090/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: textareaRef.current.value }),
    })
      .then((res) =>
        res.json().then((data) => {
          setResponse(data.response);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.error(err);
        alert("Error");
        setLoading(false);
      });
  }

  return (
    <div className="p-10 relative">
      {loading && (
        <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center drop-shadow-lg">
          <img
            src="https://www.atera.com/app/themes/atera/dist/images/magic_animation.gif"
            alt="loading"
          />
          <h1 className="text-white text-4xl font-medium">
            Generating response...
          </h1>
        </div>
      )}

      {response && (
        <div className="absolute inset-0 flex flex-col items-center bg-white p-8 gap-y-5">
          <p>{response}</p>
          <button
            className="text-white bg-teal-600 px-3 py-1 rounded flex gap-x-1 items-center"
            onClick={() => {
              setResponse("");
            }}
          >
            <Icon.ArrowLeft size={18} />
            Ok, go back
          </button>
        </div>
      )}

      <div className="flex gap-x-3 mb-8">
        {tools.map((tool, key) => (
          <div
            className={twMerge(
              "flex items-center gap-x-2 border px-2 py-1 rounded-full border-black font-medium cursor-pointer",
              key === selectedTool ? "bg-gray-500 font-normal text-white" : "hover:bg-slate-200"
            )}
            key={key}
            onClick={() => setSelectedTool(key)}
          >
            <tool.icon size={14} strokeWidth={2} />
            <span className="text-xs">{tool.name}</span>
          </div>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        name="contract"
        className="bg-blue-100 outline-none p-2 rounded-lg w-full h-[70vh] resize-none"
        placeholder="Input your contract code here..."
      ></textarea>

      <button
        className="bg-teal-500 mt-5 mx-auto flex items-center gap-x-1 text-white rounded-md px-4 py-2 font-medium"
        onClick={() => generateResponse()}
      >
        <Icon.Stars size={16} fill="white" />
        Generate
      </button>
    </div>
  );
}

const tools = [
  {
    name: "Readme Generator",
    prefix: "",
    suffix: "",
    icon: Icon.BookImage,
  },
  {
    name: "Interface Generator",
    prefix: "",
    suffix: "",
    icon: Icon.ScrollText,
  },
  {
    name: "Explainer",
    prefix: "",
    suffix: "",
    icon: Icon.Wand,
  },
  {
    name: "Gas Optimization",
    prefix: "",
    suffix: "",
    icon: Icon.Fuel,
  },
  {
    name: "Bughunter",
    prefix: "",
    suffix: "",
    icon: Icon.Bug,
  },
  {
    name: "Write Tests",
    prefix: "",
    suffix: "",
    icon: Icon.TestTubeDiagonal,
  },
  {
    name: "Code Generation",
    prefix: "",
    suffix: "",
    icon: Icon.Stars,
  },
];
