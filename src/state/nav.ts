import {create} from 'zustand';

export interface INavState {
    offCanvas: boolean;
    sticky: boolean;
    setOffCanvas: (value: boolean) => void;
    setSticky: (value: boolean) => void;
}

const useNavState = create<INavState>((set) => ({
    offCanvas: false,
    sticky: false,
    setOffCanvas: (value: boolean): void => set((state) => ({...state, offCanvas: value})),
    setSticky: (value: boolean): void => set((state) => ({...state, sticky: value}))
}));

export default useNavState;