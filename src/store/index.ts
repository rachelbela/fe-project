import { create } from "zustand";

type State = {
  bears: number;
};

type Action = {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (bears: number) => void;
};

// define the initial state
const initialState: State = {
  bears: 0,
};
export const useStore = create<State & Action>((set) => ({
  ...initialState,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
