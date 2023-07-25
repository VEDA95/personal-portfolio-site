import { create } from 'zustand';

export interface IMidState {
    location: number | null;
    setLocation: (value: number) => void;
    clearLocation: () => void;
}

const useMidState = create<IMidState>((set) => ({
    location: null,
    setLocation: (value: number): void => set((state) => ({...state, location: value})),
    clearLocation: (): void => set((state) => ({...state, location: null}))
}));

export default useMidState;