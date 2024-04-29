import "./App.css";

import { Pokemon } from "./db";

// @ts-expect-error duh
const uniques = Object.values(Pokemon).map(pkmn => pkmn.uniques).flat();

function App() {
  return (
    <>
      <header>
        <div>Dex Progress: </div>
        <div>Box Progress:</div>
        <div>Form Progress:</div>
      </header>
      {uniques.map(_ => <div>{_}</div>)}
    </>
  );
}

export default App;
