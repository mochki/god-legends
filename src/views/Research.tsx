import { Pokemon } from "../db";

const uniques = Object.values(Pokemon)
  // @ts-expect-error duh
  .map((pkmn) => pkmn.uniques)
  .flat();

export default function Research() {
  return (
    <>
      {uniques.map((_) => (
        <div>{_}</div>
      ))}
    </>
  );
}
