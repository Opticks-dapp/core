import { useState } from "react";
import Icon from "./components/Icon";
import Outlet from "./Outlet";
import { twMerge } from "tailwind-merge";

export default function App() {
  const [view, setView] = useState(0);

  return (
    <>
      <main className="flex">
        <nav className="h-screen flex flex-col bg-sky-800 p-10">
          <div className="flex items-center gap-x-2 mb-20">
            <img
              src="https://avatars.githubusercontent.com/u/191602027?s=200&v=4"
              alt="logo"
              className="size-10 brightness-0 invert"
            />
            <h2 className="font-medium text-white text-2xl">Opticks</h2>
          </div>

          <div className="text-white flex flex-col gap-y-10">
            {navItems.map((item, key) => (
              <div
                className={twMerge(
                  "flex items-center gap-x-4 opacity-60 duration-200 cursor-pointer",
                  key === view ? "opacity-100" : "hover:scale-105"
                )}
                onClick={() => {
                  setView(key);
                }}
                key={key}
              >
                <item.icon strokeWidth={1.5} size={36} />
                <span className="text-xl">{item.name}</span>
              </div>
            ))}
          </div>

          <figure className="flex-1" />

          <div className="">
            <div className="flex font-medium text-white gap-x-7 text-xs">
              <p className="flex items-center gap-x-1">
                <Icon.Book size={13} /> Docs
              </p>
              <p className="flex items-center gap-x-1">
                <Icon.Scale size={13} /> Disclaimer
              </p>
            </div>
          </div>
        </nav>

        <div className="h-screen flex-1 overflow-y-scroll relative z-20 shadow-2xl shadow-black/80">
          <Outlet view={view} />
        </div>
      </main>
    </>
  );
}

const navItems = [
  { name: "Contract Tools", icon: Icon.Boxes },
  { name: "HITS on chain", icon: Icon.Network },
  { name: "Pair Programming", icon: Icon.Bot },
];
