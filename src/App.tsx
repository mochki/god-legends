import { useState } from "react";
import Research from "./views/Research";
import BoxLayout from "./views/BoxLayout";
import Forms from "./views/Forms";
import Settings from "./views/Settings";

export default function App() {
  const [view, setView] = useState("Research");

  function handleViewClick(e) {
    setView(e.target.innerText);
  }

  return (
    <>
      <header className="flex justify-between p-1 sticky top-0 bg-indigo-950">
        <nav className="flex justify-between space-x-4 bg-indigo-900">
          <button onClick={handleViewClick}>Research</button>
          <button onClick={handleViewClick}>Box Layout</button>
          <button onClick={handleViewClick}>All Forms</button>
          <button onClick={handleViewClick}>Le Settings</button>
        </nav>
        <div>
          Research:{" "}
          <progress max="100" value="70">
            70%
          </progress>
        </div>
        <div>
          Box:{" "}
          <progress max="100" value="70">
            70%
          </progress>
        </div>
        <div>
          Form:{" "}
          <progress max="100" value="70">
            70%
          </progress>
        </div>
        <div>
          <button>Toggle Workspace</button>
        </div>
      </header>
      <main className="flex">
        <div className="flex-auto">
          {view === "Research" && <Research />}
          {view === "Box Layout" && <BoxLayout />}
          {view === "All Forms" && <Forms />}
          {view === "Le Settings" && <Settings />}
        </div>
        <div className="w-0.5 cursor-col-resize bg-indigo-700"></div>
        <div className="flex">Work column</div>
      </main>
    </>
  );
}
