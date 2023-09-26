import { useMidState } from '../../state/container';
import { ParticleOrb, ParticleWave } from '../particles';
import type { ReactElement, FC } from 'react';


export default function ParticleBackground(): ReactElement<FC> {
    const showAlternate = useMidState((state) => state.showAlternate);

    return (
        <>
            <ParticleOrb invisible={showAlternate} />
            <ParticleWave invisible={!showAlternate} />
        </>
    );
}