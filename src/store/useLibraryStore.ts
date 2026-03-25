import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Asset } from '../types';

interface LibraryState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  favorites: string[];
  toggleFavorite: (assetId: string) => void;
  filters: {
    type: string[];
    affiliate: string[];
    tags: string[];
  };
  setFilters: (filters: Partial<LibraryState['filters']>) => void;
  clearFilters: () => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      activeTab: 'Featured',
      setActiveTab: (tab) => set({ activeTab: tab }),
      selectedAsset: null,
      setSelectedAsset: (asset) => set({ selectedAsset: asset }),
      favorites: [],
      toggleFavorite: (assetId) =>
        set((state) => ({
          favorites: state.favorites.includes(assetId)
            ? state.favorites.filter((id) => id !== assetId)
            : [...state.favorites, assetId],
        })),
      filters: {
        type: [],
        affiliate: [],
        tags: [],
      },
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      clearFilters: () =>
        set({
          filters: { type: [], affiliate: [], tags: [] },
        }),
    }),
    {
      name: 'library-store',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
