import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {Pokemon, Research} from '../db';

// peak not dry and so lazy now i just want box tracker
// @ts-expect-error duh
const uniqs = Object.values(Pokemon).flatMap(({boxTargets}) => boxTargets);

export const useTracker = create(
  persist(
    (set, get) => ({
      researchTasks: Research.map(() => false),
      boxedPokemon: uniqs.map(() => false),
      updateResearchTask: (id, update) =>
        set(() => ({
          // @ts-expect-error duh
          researchTasks: get().researchTasks.with(id, update),
        })),
      // bulk removal later
      bulkUpdateResearchTask: ids =>
        set(() => ({
          // @ts-expect-error duh
          researchTasks: get().researchTasks.map((_, id) => ids.includes(id)),
        })),
      updateBoxedPokemon: (id, update) =>
        // @ts-expect-error duh
        set(() => ({boxedPokemon: get().boxedPokemon.with(id, update)})),
    }),
    {name: 'progress-tracker'}, // prob need version here
  ),
);
