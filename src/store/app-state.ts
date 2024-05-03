import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// import { Research } from "../db";

export const useAppState = create(
  persist(
    (set, get) => ({
      view: 'Research',
      researchCategory: '',
      workspaceEntities: [],
      updateView: view => set(() => ({view})),
      updateWorkspaceEntities: entity =>
        set(() => ({
          // @ts-expect-error duh
          workspaceEntities: [...get().workspaceEntities, entity],
        })),
      updateResearchCategory: researchCategory => set(() => ({researchCategory})),
      clearWorkspaceEntities: () => set(() => ({workspaceEntities: []})),
    }),
    {name: 'app-state'},
  ),
);

/** Entities
 * type: task || pokemon
 * data: { pkid, task, category, goal } || {}
 * -> just use their shape
 */
