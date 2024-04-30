import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Research } from "../db";

export const useTracker = create(
  persist(
    (set, get) => ({
      researchTasks: Research.map(() => false),
      updateResearchTask: (id, update) =>
        set(() => ({
          // @ts-expect-error duh
          researchTasks: get().researchTasks.with(id, update),
        })),
      // bulk removal later
      bulkUpdateResearchTask: (ids) =>
        set(() => ({
          // @ts-expect-error duh
          researchTasks: get().researchTasks.map((_, id) => ids.includes(id)),
        })),
    }),
    { name: "progress-tracker" } // prob need version here
  )
);
