import React from 'react';
import {useAppState} from '../store/app-state';
import {useTracker} from '../store/tracker';

import {Pokemon, Research} from '../db';

// LOL OMG WHO TF WROTE THIS hehehe sigh

const cats = ['Catch', 'Move: Use', 'Move: Defeat', 'Overworld', 'Special'];

export default function Workspace() {
  const researchCat = useAppState(({researchCategory}) => researchCategory);
  const setResearchCat = useAppState(({updateResearchCategory}) => updateResearchCategory);

  const view = useAppState(({view}) => view);
  const workspaceEntities = useAppState(({workspaceEntities}) => workspaceEntities);
  const clearWorkspaceEntities = useAppState(({clearWorkspaceEntities}) => clearWorkspaceEntities);
  const statuses = useTracker(({researchTasks}) => researchTasks);

  // research
  const remainingTasks = Research.filter((_, rId) => !statuses[rId]);
  // eslint-disable-next-line
  const justCatos = remainingTasks.map(([_, {category}]) => category);
  const handleResearchCatClick = e => setResearchCat(e.target.innerText.replace('::', ''));
  const clearResearchCatClick = () => setResearchCat('');

  if (view !== 'Research') return null;

  return (
    <>
      <section className="border-l-2 border-l-indigo-300 flex flex-col w-auto p-2">
        <div className="flex space-x-2 items-center">
          <h2 className="mt-1 mb-4 text-lg font-medium flex-grow">Workspace</h2>
          {/* <div className="bg-slate-600 px-1 rounded-md cursor-pointer hover:opacity-75">tskTog</div>
          <div className="bg-slate-600 px-1 rounded-md cursor-pointer hover:opacity-75">boxTog</div>
          <div className="bg-slate-600 px-1 rounded-md cursor-pointer hover:opacity-75">frmTog</div> */}
          <div
            className="bg-red-900 px-1 rounded-md cursor-pointer hover:opacity-75"
            onClick={() => clearWorkspaceEntities()}
          >
            Clear
          </div>
        </div>
        <div className="flex flex-col *:border *:rounded-md *:p-1 space-y-2">
          {view === 'Research' && (
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="mb-1 font-semibold">Remaining Tasks: {remainingTasks.length}</div>
                <div
                  className="bg-red-900 px-1 rounded-md cursor-pointer hover:opacity-75 self-center"
                  onClick={clearResearchCatClick}
                >
                  Unset
                </div>
              </div>
              <div className="grid grid-cols-[repeat(3,_max-content)] *:text-xs justify-between gap-2">
                {React.Children.toArray(
                  cats.map(cat => (
                    <div>
                      <span
                        className="hover:text-indigo-300 cursor-pointer"
                        onClick={handleResearchCatClick}
                      >
                        {cat}::
                      </span>
                      <span className="text-indigo-400">
                        {justCatos.filter(c => c === cat).length}
                      </span>
                    </div>
                  )),
                )}
              </div>
              <div className="border-y border-y-indigo-200 my-2 py-1">
                {researchCat ?
                  <div className="grid grid-cols-[max-content_minmax(0,_1fr)_max-content] gap-x-1">
                    {React.Children.toArray(
                      remainingTasks
                        // eslint-disable-next-line
                        .filter(([_, {category}]) => category === researchCat)
                        .map(([pkid, {task, goal}]) => (
                          <>
                            <div>{Pokemon[pkid].name}</div>
                            <div>{task}</div>
                            <div>{goal}</div>
                          </>
                        )),
                    )}
                  </div>
                : <div className="text-center text-sm">Filter by Category</div>}
              </div>
            </div>
          )}
          {workspaceEntities.map(({type, data: {pkid, task, category, goal, type: moveType}}) =>
            type === 'Task' ?
              <div className="flex flex-col" key={`${pkid}-${task}`}>
                <div className="flex justify-between">
                  <div className="font-semibold">{Pokemon[pkid].name}</div>
                  <div className="text-indigo-300">{category}</div>
                </div>
                <div className="flex justify-between space-x-2">
                  <div>{task}</div>
                  <div>{goal}</div>
                </div>
                {category === 'Move: Use' && (
                  <div className="flex border-y border-y-indigo-200 my-2 py-1">
                    <div className="font-bold flex-grow pl-2">{moveType}</div>
                    <div className="grid grid-cols-[repeat(4,_max-content)] justify-end gap-x-4">
                      {(() => {
                        const doneFiltered = Research.filter((_, idx) => !statuses[idx]);

                        const typeFiltered = doneFiltered.filter(
                          // eslint-disable-next-line
                          ([_, task]) => task.category === 'Move: Defeat' && task.type === moveType,
                        );

                        return typeFiltered.map(([pkid, task], uid) => (
                          <React.Fragment key={uid}>
                            <div>{Pokemon[pkid].name}</div>
                            <div>{task.goal}</div>
                          </React.Fragment>
                        ));
                      })()}
                    </div>
                  </div>
                )}
                {category === 'Move: Defeat' && moveType !== '*' && (
                  <div className="grid grid-cols-[repeat(2,_max-content)] justify-between gap-x-4 gap-y-px border-y border-y-indigo-200 my-2 py-1">
                    <div className="col-span-2 font-bold place-self-end pr-2 pt-px">{moveType}</div>
                    {(() => {
                      const doneFiltered = Research.filter((_, idx) => !statuses[idx]);

                      const typeFiltered = doneFiltered.filter(
                        // eslint-disable-next-line
                        ([_, task]) => task.category === 'Move: Use' && task.type === moveType,
                      );

                      return typeFiltered.map(([pkid, task], uid) => (
                        <React.Fragment key={uid}>
                          <div className="col-span-2 font-semibold">{Pokemon[pkid].name}</div>
                          <div>{task.task}</div>
                          <div>{task.goal}</div>
                        </React.Fragment>
                      ));
                    })()}
                  </div>
                )}
              </div>
            : null,
          )}
        </div>
      </section>
    </>
  );
}
