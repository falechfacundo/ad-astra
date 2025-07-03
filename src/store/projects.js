import { create } from "zustand";
import { worker_url } from "../lib/constant.js";

export const useProjectsStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,
  lastFetchedUserId: null,
  async fetchProjects(userId) {
    if (!userId) return;
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${worker_url}/proyecto?cliente=${userId}`);
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
  async getProjectById(id) {
    if (!id) return null;
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${worker_url}/proyecto/${id}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      set({ error: "No se pudo cargar el proyecto." });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  clearProjects() {
    set({ projects: [], error: null, lastFetchedUserId: null });
  },
  async updateProjectStatus(id, status, additionalData = null) {
    set({ loading: true, error: null });
    try {
      // Ahora la firma se hace sobre el contrato, no el proyecto
      const requestBody = { status };
      if (additionalData) Object.assign(requestBody, additionalData);
      const response = await fetch(`${worker_url}/contrato/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const updated = await response.json();
      // Actualizar el proyecto en el store si corresponde
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...updated } : p
        ),
      }));
      return updated;
    } catch (err) {
      set({ error: "No se pudo actualizar el proyecto." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  async setProjectPaymentLink(id, paymentLink) {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, paymentLink, paymentStatus: "pending" } : p
      ),
    }));
  },
}));
