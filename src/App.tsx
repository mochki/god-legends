import {IoSchoolSharp} from 'react-icons/io5';
import {PiFarmFill} from 'react-icons/pi';

import {useTracker} from './store/tracker';
import {useAppState} from './store/app-state';

import Research from './views/Research';
import BoxLayout from './views/BoxLayout';
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
      <header className="h-8 flex sticky top-0 bg-indigo-950 z-10">
        <nav className="flex justify-between space-x-4 px-2">
          <button
            onClick={handleViewClick}
            className={view === 'Research' ? 'text-indigo-400' : undefined}
          >
            Research
          </button>
          <button
            onClick={handleViewClick}
            className={view === 'Box Layout' ? 'text-indigo-400' : undefined}
          >
            Box Layout
          </button>
          <button
            onClick={handleViewClick}
            className={view === 'Settings' ? 'text-indigo-400' : undefined}
          >
            Settings
          </button>
        </nav>
        <div className="flex items-center text-indigo-400">
          <IoSchoolSharp className="mr-1" />
          <progress max="100" value={taskCompletion} />
          <span className="text-sm ml-0.5 mr-2">{taskCompletion.toFixed(1)}%</span>
          <PiFarmFill className="mr-0.5" />
          <progress max="100" value={boxCompletion} />
          <span className="text-sm ml-0.5">{boxCompletion.toFixed(1)}%</span>
        </div>
      </header>
      <main className="flex">
        <div className="flex-auto p-2">
          {view === 'Research' && <Research />}
          {view === 'Box Layout' && <BoxLayout />}
          {view === 'Settings' && <Settings />}
        </div>
        <Workspace />
      </main>
    </>
  );
}
