import {useTracker} from '../store/tracker';

import {Pokemon} from '../db';
import {Sprites} from '../assets/sprites';
import alphaUrl from '../assets/alpha.png';
import {IoFemaleSharp, IoMaleSharp} from 'react-icons/io5';
import {HiOutlineSparkles} from 'react-icons/hi2';

const uniques = Object.values(Pokemon)
  // @ts-expect-error duh
  .flatMap(({boxTargets}) => boxTargets)
  .map((pk, uid) => ({...pk, uid}));
const BOXLIMIT = 30;

// gpt said so
const splitArray = (arr, n) =>
  Array.from({length: Math.ceil(arr.length / n)}, (_, index) =>
    arr.slice(index * n, index * n + n),
  );

export default function BoxLayout() {
  const collected = useTracker(({boxedPokemon}) => boxedPokemon);
  const updateBoxedPokemon = useTracker(({updateBoxedPokemon}) => updateBoxedPokemon);

  const handlePokemonClick = uid => () => {
    updateBoxedPokemon(uid, collected[uid]);
  };

  const boxes = splitArray(uniques, BOXLIMIT);

  return (
    <div className="grid grid-cols-4 gap-2">
      {boxes.map((box, id) => (
        <div
          key={id}
          className="flex flex-col min-h-56 min-w-48 rounded-md border-2 border-indigo-400"
        >
          <div className="ml-2 font-semibold text-indigo-200">Box #{id + 1}</div>
          <div className="grid grid-cols-6 grid-rows-4">
            {box.map(_ => (
              <div
                key={_.uid}
                className="relative cursor-pointer"
                onClick={handlePokemonClick(_.uid)}
              >
                {_.shiny ?
                  <img
                    src={Sprites[_.pokemon]}
                    title={_.form}
                    className="hue-rotate-[140deg] sepia-[20%] contrast-150"
                  />
                : <img src={Sprites[_.pokemon]} title={_.form} />}
                {/* the forms? lol */}
                {_.alpha && (
                  <img
                    src={alphaUrl}
                    className="absolute h-2/6 w-2/6 bottom-1 right-1 saturate-50"
                  />
                )}
                {_.shiny && (
                  <HiOutlineSparkles className="absolute h-1/4 w-1/4 top-1 right-1 text-amber-200" />
                )}
                {_.gender === 'Female' && (
                  <IoFemaleSharp className="absolute h-1/4 w-1/4 bottom-1 left-1 text-pink-300" />
                )}
                {_.gender === 'Male' && (
                  <IoMaleSharp className="absolute h-1/4 w-1/4 bottom-1 left-1 text-blue-300" />
                )}
                {/* lol did i even implement this? */}
                {collected[_.uid] && (
                  <div className="absolute h-1/4 w-1/4 bottom-4 left-4 text-pink-600">GOT</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
