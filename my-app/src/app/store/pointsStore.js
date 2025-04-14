import { create } from 'zustand';

const usePointsStore = create((set) => ({
  points: 0, // Initial points balance
  setPoints: (newPoints) => set({ points: newPoints }), // Set points directly
  addPoints: (earnedPoints) => set((state) => ({ points: state.points + earnedPoints })), // Increment points
}));

export default usePointsStore;
