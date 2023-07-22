import {create} from 'zustand';

export interface IOffCanvasState {
    enabled: boolean;
    setOffCanvas: (value: boolean) => void;
}

const useOffCanvasState = create<IOffCanvasState>((set) => ({
    enabled: false,
    setOffCanvas: (value: boolean): void => set((state) => ({...state, enabled: value}))
}));

export default useOffCanvasState;