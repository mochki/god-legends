import { create } from "zustand";
import { persist } from "zustand/middleware";

// import { Research } from "../db";

export const useAppState = create(
  persist(
    (set, get) => ({
      view: "Research",
      workspaceEntities: null,
      updateView: (view) => set(() => ({ view })),
      updateWorkspaceEntities: (entity) =>
        set(() => ({
          // @ts-expect-error duh
          workspaceEntities: { ...get().workspaceEntities, entity },
        })),
    }),
    { name: "app-state" }
  )
);
