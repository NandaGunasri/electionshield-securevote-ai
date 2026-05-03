import { create } from 'zustand';

interface AppState {
  voterStatus: 'unregistered' | 'pending' | 'verified';
  activeAlertsCount: number;
  setVoterStatus: (status: 'unregistered' | 'pending' | 'verified') => void;
  setAlertsCount: (count: number) => void;
}

export const useStore = create<AppState>((set) => ({
  voterStatus: 'unregistered',
  activeAlertsCount: 3,
  setVoterStatus: (status) => set({ voterStatus: status }),
  setAlertsCount: (count) => set({ activeAlertsCount: count }),
}));
