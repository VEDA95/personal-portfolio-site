import { create } from 'zustand';

export interface ILocationState {
    location: number | null;
    setLocation: (value: number) => void;
    clearLocation: () => void;
}

export interface IMidState extends ILocationState {
    showAlternate: boolean;
    setAlternate: (value: boolean) => void;
    clearAlternate: () => void;
}

const useHeroState = create<ILocationState>((set) => ({
    location: null,
    setLocation: (value: number): void => set((state) => ({...state, location: value})),
    clearLocation: (): void => set((state) => ({...state, location: null}))
}));

const useMidState = create<IMidState>((set) => ({
    location: null,
    showAlternate: false,
    setAlternate: (value: boolean): void => set((state) => ({...state, showAlternate: value})),
    setLocation: (value: number): void => set((state) => ({...state, location: value})),
    clearLocation: (): void => set((state) => ({...state, location: null})),
    clearAlternate: (): void => set((state) => ({...state, showAlternate: false}))
}));

export { useMidState, useHeroState };