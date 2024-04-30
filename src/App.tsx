import { useState } from "react";
import Research from "./views/Research";
import BoxLayout from "./views/BoxLayout";
import Forms from "./views/Forms";
import Settings from "./views/Settings";

import { useTracker } from "./store/tracker";

export default function App() {
  const [view, setView] = useState("Research");
  // @ts-expect-error duh
  const researchTasks = useTracker((state) => state.researchTasks);
  const taskCompletion =
    (100 * researchTasks.reduce((sum, status) => sum + Number(status), 0)) /
    researchTasks.length;

  function handleViewClick(e) {
    setView(e.target.innerText);
  }

  return (
    <>
      <header className="h-8 flex justify-between sticky top-0 bg-indigo-950">
        <nav className="flex justify-between space-x-4 bg-indigo-900">
          <button onClick={handleViewClick}>Research</button>
          <button onClick={handleViewClick}>Box Layout</button>
          <button onClick={handleViewClick}>All Forms</button>
          <button onClick={handleViewClick}>Le Settings</button>
        </nav>
        <div>
          Research: <progress max="100" value={taskCompletion} />
        </div>
        <div>
          WIP.Box: <progress max="100" value="20" />
        </div>
        <div>
          WIP.Form: <progress max="100" value="20" />
        </div>
        <div>
          <button>Toggle Workspace</button>
        </div>
      </header>
      <main className="flex">
        <div className="flex-auto p-2">
          {view === "Research" && <Research />}
          {view === "Box Layout" && <BoxLayout />}
          {view === "All Forms" && <Forms />}
          {view === "Le Settings" && <Settings />}
        </div>
        <div className="w-[3px] cursor-col-resize bg-indigo-700"></div>
        <section className="flex min-w-80">
          <h2>Workspace</h2>
        </section>
      </main>
    </>
  );
}
