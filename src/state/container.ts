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


export type ScrollTypeValue = 'beginning' | 'about';

export interface IScrollToState {
    type: ScrollTypeValue | null;
    setScrollType: (value: ScrollTypeValue) => void;
    clearScrollType: () => void;
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

const useScrollToState = create<IScrollToState>((set) => ({
    type: null,
    setScrollType: (value: ScrollTypeValue) => set((state) => ({...state, type: value})),
    clearScrollType: () => set((state) => ({...state, type: null}))
}));

export { useMidState, useHeroState, useScrollToState };