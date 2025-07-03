import { create } from "zustand";
import { worker_url } from "../lib/constant.js";

export const useProjectsStore = create((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  lastFetchedUserId: null,
  async fetchProjects(userId) {
    if (!userId) return;
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${worker_url}/projects?cliente=${userId}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      set({
        projects: Array.isArray(data) ? data : [],
        lastFetchedUserId: userId,
      });
    } catch (err) {
      set({ error: "No se pudieron cargar los proyectos." });
    } finally {
      set({ loading: false });
    }
  },
  getProjectById(id) {
    return get().projects.find((p) => p.id === id);
  },
  clearProjects() {
    set({ projects: [], error: null, lastFetchedUserId: null });
  },
}));
