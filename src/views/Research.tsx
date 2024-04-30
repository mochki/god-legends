import React, { useState } from "react";
import { useTracker } from "../store/tracker";

import { Pokemon, Research as R } from "../db";

export default function Research() {
  // @ts-expect-error duh
  const statuses = useTracker((state) => state.researchTasks);
  // @ts-expect-error duh
  const updateResearchTask = useTracker((state) => state.updateResearchTask);

  const [filterView, setFilterView] = useState(false);

  return (
    <div className="grid gap-x-1 grid-cols-[repeat(5,_max-content)_repeat(1,_minmax(0,_1fr))]">
      {React.Children.toArray(
        R.map(([pkid, { task, category, goal }], idx) =>
          filterView && statuses[idx] ? null : (
            <>
              <div className="hover:bg-slate-600 cursor-pointer">#{pkid}</div>
              <div className="hover:bg-slate-600 cursor-pointer">
                {Pokemon[pkid].name}
              </div>
              <div className="hover:bg-slate-600 cursor-pointer">{task}</div>
              <div className="hover:bg-slate-600 cursor-pointer p-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                  checked={statuses[idx]}
                  onChange={() => updateResearchTask(idx, !statuses[idx])}
                />
              </div>
              <div className="hover:bg-slate-600 cursor-pointer">{goal}</div>
              <div className="hover:bg-slate-600 cursor-pointer">
                {category}
              </div>
            </>
          )
        )
      )}
      <div
        className="fixed bottom-4 left-3 h-12 w-12 flex items-center justify-center cursor-pointer bg-indigo-600/25 rounded-full text-indigo-100/50 hover:bg-indigo-600 hover:text-indigo-100 transition duration-300"
        onClick={() => setFilterView(!filterView)}
      >
        Fltr
      </div>
    </div>
  );
}
