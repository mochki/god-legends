import {useTracker} from './store/tracker';
import {useAppState} from './store/app-state';

import Research from './views/Research';
import BoxLayout from './views/BoxLayout';
import Forms from './views/Forms';
import Settings from './views/Settings';
import Workspace from './components/Workspace';

export default function App() {
  const view = useAppState(({view}) => view);
  const setView = useAppState(({updateView}) => updateView);
  const researchTasks = useTracker(({researchTasks}) => researchTasks);
  const boxedPokemon = useTracker(({boxedPokemon}) => boxedPokemon);

  const taskCompletion =
    (100 * researchTasks.reduce((sum, status) => sum + Number(status), 0)) / researchTasks.length;

  const boxCompletion =
    (100 * boxedPokemon.reduce((sum, status) => sum + (status ? 1 : 0), 0)) / boxedPokemon.length;

  const handleViewClick = e => setView(e.target.innerText);

  return (
    <>
      <header className="h-8 flex justify-between sticky top-0 bg-indigo-950 z-10">
        <nav className="flex justify-between space-x-4 bg-indigo-900">
          <button onClick={handleViewClick}>Research</button>
          <button onClick={handleViewClick}>Box Layout</button>
          <button onClick={handleViewClick}>All Forms</button>
          <button onClick={handleViewClick}>Le Settings</button>
        </nav>
        <div>
          Research: <progress max="100" value={taskCompletion} /> {taskCompletion.toFixed(1)}%
        </div>
        <div>
          Box: <progress max="100" value={boxCompletion} /> {boxCompletion.toFixed(1)}%
        </div>
      </header>
      <main className="flex">
        <div className="flex-auto p-2">
          {view === 'Research' && <Research />}
          {view === 'Box Layout' && <BoxLayout />}
          {view === 'All Forms' && <Forms />}
          {view === 'Le Settings' && <Settings />}
        </div>
        <Workspace />
      </main>
    </>
  );
}
