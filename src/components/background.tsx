import { useEffect, useState, useCallback } from 'react';
import useMidState from '../state/mid';
import ParticleOrb from './particle_orb';
import ParticleWave from './particle_wave';
import type { ReactElement, FC } from 'react';


export default function ParticleBackground(): ReactElement<FC> {
    const [showAlternate, setShowAlternate] = useState<boolean>(false);
    const location = useMidState((state) => state.location);
    const handleScroll = useCallback(() => {
        if(location == null) return;
        if((window.scrollY > location) && !showAlternate) setShowAlternate(true);
        if((window.scrollY < location) && showAlternate) setShowAlternate(false);
    }, [location, showAlternate]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <ParticleOrb invisible={showAlternate} />
            <ParticleWave invisible={!showAlternate} />
        </>
    );
}