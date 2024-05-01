import {Pokemon} from '../db';

const uniques = Object.values(Pokemon)
  // @ts-expect-error duh
  .map(pkmn => pkmn.uniques)
  .flat();

export default function BoxLayout() {
  return (
    <div className="grid grid-cols-6">
      {uniques.map(uniqueForm => (
        <div key={uniqueForm} className="w-32 h-32">
          {uniqueForm.split('-').map(subForm => (
            <div key={`${uniqueForm}-${subForm}`}>{subForm}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
