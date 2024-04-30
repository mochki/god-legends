import React, { useState } from "react";
import { useAppState } from "../store/appState";
import { useTracker } from "../store/tracker";

import { Pokemon, Research } from "../db";

// LOL OMG WHO TF WROTE THIS hehehe sigh

const cats = ["Catch", "Move: Use", "Move: Defeat", "Overworld", "Special"];

export default function Workspace() {
  const [researchCat, setResearchCat] = useState("");

  const view = useAppState(({ view }) => view);
  const statuses = useTracker(({ researchTasks }) => researchTasks);

  // research
  const remainingTasks = Research.filter((_, rId) => !statuses[rId]);
  // eslint-disable-next-line
  const justCatos = remainingTasks.map(([_, { category }]) => category);
  const handleResearchCatClick = (e) => setResearchCat(e.target.innerText);

  return (
    <>
      <section className="border-l-2 border-l-indigo-300 flex flex-col w-auto p-2">
        <div className="flex space-x-2 items-center">
          <h2 className="mt-1 mb-4 text-lg font-medium flex-grow">Workspace</h2>
          <div className="bg-slate-600 px-1 rounded-md cursor-pointer hover:opacity-75">
            tskTog
          </div>
          <div className="bg-slate-600 px-1 rounded-md cursor-pointer hover:opacity-75">
            boxTog
          </div>
          <div className="bg-slate-600 px-1 rounded-md cursor-pointer hover:opacity-75">
            frmTog
          </div>
        </div>
        <div className="flex flex-col *:border *:rounded-md *:p-1">
          {view === "Research" && (
            <div className="flex flex-col">
              <div className="mb-1">
                Remaining Tasks: {remainingTasks.length}
              </div>
              <div className="flex flex-wrap *:text-xs justify-between space-x-2">
                {cats.map((cat) => (
                  <div key={cat}>
                    <span
                      className="hover:text-indigo-300 cursor-pointer"
                      onClick={handleResearchCatClick}
                    >
                      {cat}
                    </span>
                    ::
                    <span className="text-indigo-400">
                      {justCatos.filter((c) => c === cat).length}
                    </span>
                  </div>
                ))}
              </div>
              {/* TODO NEXT */}
              <div>A task's related tasks!!!</div>
              <div className="border-y border-y-indigo-200 my-2 py-1">
                <div>{researchCat || "Select a category"}</div>
                <div className="grid grid-cols-[max-content_minmax(0,_1fr)_max-content] gap-x-1">
                  {React.Children.toArray(
                    remainingTasks
                      // eslint-disable-next-line
                      .filter(([_, { category }]) => category === researchCat)
                      .map(([pkid, { task, goal }]) => (
                        <>
                          <div>{Pokemon[pkid].name}</div>
                          <div>{task}</div>
                          <div>{goal}</div>
                        </>
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
          {/* {view === "Box Layout" && <BoxLayout />}
          {view === "All Forms" && <Forms />}
          {view === "Le Settings" && <Settings />} */}
        </div>
      </section>
    </>
  );
}
