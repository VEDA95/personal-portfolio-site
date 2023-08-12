import { create } from 'zustand';

type TypeStateType = 'error' | 'success';

export interface IBannerState {
    message: string | null;
    open: boolean;
    type: TypeStateType;
    setMessage: (value: string) => void;
    setType: (value: TypeStateType) => void;
    clearMessage: () => void;
    clearType: () => void;
    toggleOpen: () => void;
}

const useBannerState = create<IBannerState>((set): IBannerState => ({
    message: null,
    open: false,
    type: 'error',
    setMessage: (value: string): void => set((state: IBannerState): IBannerState => ({...state, message: value})),
    setType: (value: TypeStateType): void => set((state: IBannerState): IBannerState => ({...state, type: value})),
    clearMessage: (): void => set((state: IBannerState): IBannerState => ({...state, message: null})),
    clearType: (): void => set((state: IBannerState): IBannerState => ({...state, type: 'error'})),
    toggleOpen: (): void => set((state: IBannerState): IBannerState => ({...state, open: !state.open}))
}));

export { useBannerState };