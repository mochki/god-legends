import {useState} from 'react';
import {useTracker} from '../store/tracker';
import {Fn} from '../db';

export default function Settings() {
  const bulkUpdateResearchTask = useTracker(
    // @ts-expect-error duh
    state => state.bulkUpdateResearchTask,
  );
  const [importField, setImportField] = useState('');

  function handleBulkImport() {
    function entryExpansion(entry) {
      if (!entry.includes('-')) {
        return Number(entry);
      }
      const [low, high] = entry.split('-').map(Number);
      return Array.from({length: high - low + 1}, (_, idx) => idx + low);
    }

    const researchIds = importField
      .split(',')
      .flatMap(entryExpansion)
      .flatMap(Fn.fetchResearchIdsForPid);

    bulkUpdateResearchTask(researchIds);
    setImportField('');
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-8 text-2xl font-semibold">Settings</h1>
      <h3 className="text-xl">Bulk Import Pokedex</h3>
      <p>Import ✨Perfect✨ entries only</p>
      <textarea
        value={importField}
        onChange={e => setImportField(e.target.value)}
        placeholder="1-45,47-53,98,99,103-140,..."
      />
      <button
        className="bg-teal-800 w-fit px-2 py-1 rounded-sm hover:bg-teal-900 active:bg-teal-950"
        onClick={handleBulkImport}
      >
        Submit
      </button>
    </div>
  );
}

// 1-42,45-58,60-63,68,80,92,105,114,130,131,136,139,142,182,199,200,228-242
