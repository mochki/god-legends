import React, {useState} from 'react';
import {useTracker} from '../store/tracker';
import {useAppState} from '../store/app-state';

import {Pokemon, Research as Rsrch, Solitude} from '../db';

export default function Research() {
  const [filterView, setFilterView] = useState(false); // finished

  const statuses = useTracker(({researchTasks}) => researchTasks);
  const updateResearchTask = useTracker(({updateResearchTask}) => updateResearchTask);

  const researchCategory = useAppState(({researchCategory}) => researchCategory);
  const workspaceEntities = useAppState(({workspaceEntities}) => workspaceEntities);
  const updateWorkspaceEntities = useAppState(
    ({updateWorkspaceEntities}) => updateWorkspaceEntities,
  );

  const makeTaskSelectHandler = task => e => {
    if (e.target.type === 'checkbox') {
      e.stopPropagation();
      return;
    }

    if (workspaceEntities.find(ent => (ent.data.taskId || '') === task.taskId)) {
      return;
    }

    updateWorkspaceEntities({
      type: 'Task',
      data: task,
    });
  };

  return (
    <div className="grid gap-x-1 grid-cols-[repeat(7,_max-content)_repeat(1,_minmax(0,_1fr))] center">
      <div>pkId</div>
      <div>Pokemon</div>
      <div>Task</div>
      <div>Fin</div>
      <div>Goal</div>
      <div>Type?</div>
      <div>Category</div>
      <div>Path of Solitude Opponent</div>
      {React.Children.toArray(
        Rsrch.map(([pkid, {task, category, goal, type}], idx) =>
          (filterView && statuses[idx]) || (researchCategory && category !== researchCategory) ?
            null
          : <div
              className="grid grid-cols-subgrid col-span-8 items-center hover:bg-slate-600 cursor-pointer border-b border-b-indigo-800"
              onClick={makeTaskSelectHandler({
                taskId: idx,
                pkid,
                task,
                category,
                goal,
                type,
              })}
            >
              <div>#{pkid}</div>
              <div>{Pokemon[pkid].name}</div>
              <div>{task}</div>
              <div className="p-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                  checked={statuses[idx]}
                  onChange={() => updateResearchTask(idx, !statuses[idx])}
                />
              </div>
              <div className="">{goal}</div>
              <div className="">{type}</div>
              <div className="">{category}</div>
              <div>{Solitude[pkid].map(oId => Pokemon[oId].name).join(', ')}</div>
            </div>,
        ),
      )}
      <div
        className="fixed bottom-4 left-3 p-2 flex items-center justify-center cursor-pointer bg-indigo-600/70 rounded-full text-indigo-100/80 hover:bg-indigo-600 hover:text-indigo-100 transition duration-300"
        onClick={() => setFilterView(!filterView)}
      >
        Filter Finished
      </div>
    </div>
  );
}
