import { useState } from "react";
import Research from "./views/Research";
import BoxLayout from "./views/BoxLayout";
import Forms from "./views/Forms";
import Settings from "./views/Settings";

export default function App() {
  const [view, setView] = useState("Research");
  
  function handleViewClick(e) {
    setView(e.target.innerText)
  }

  return (
    <>
      <header className="flex justify-between p-1 bg-indigo-950">
        <nav className="flex justify-between space-x-4 bg-indigo-900">
          <button onClick={handleViewClick}>Research</button>
          <button onClick={handleViewClick}>Box Layout</button>
          <button onClick={handleViewClick}>All Forms</button>
          <button onClick={handleViewClick}>Le Settings</button>
        </nav>
        <div>Research Progress:</div>
        <div>Box Progress:</div>
        <div>Form Progress:</div>
        <div>
          <button>Sticky</button>
        </div>
      </header>
      <div className="flex bg-cyan-950">Work bar</div>
      {view === 'Research' && <Research />}
      {view === 'Box Layout' && <BoxLayout />}
      {view === 'All Forms' && <Forms />}
      {view === 'Le Settings' && <Settings />}
    </>
  );
}
