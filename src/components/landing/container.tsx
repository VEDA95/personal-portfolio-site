import { useEffect, useCallback, useRef } from 'react';
import useNavState from '../../state/nav';
import { useHeroState, useMidState } from '../../state/container';
import type { ReactElement, FC, PropsWithChildren, MutableRefObject } from 'react';


export default function LandingPageContainer({ children }: PropsWithChildren): ReactElement<FC> {
    const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const [sticky, setSticky] = useNavState((state) => [state.sticky, state.setSticky]);
    const heroLocation = useHeroState((state) => state.location);
    const [midLocation, showAlternate, setAlternate] = useMidState((state) => [state.location, state.showAlternate, state.setAlternate]);
    const handleScroll = useCallback(() => {
        console.log(containerRef.current?.scrollTop);
        if(heroLocation == null || midLocation == null || containerRef.current == null) return;

        const { current: { scrollTop } } = containerRef;

        if((scrollTop > heroLocation) && !sticky) setSticky(true);
        if((scrollTop <= heroLocation) && sticky) setSticky(false);
        if((scrollTop > midLocation) && !showAlternate) setAlternate(true);
        if((scrollTop <= midLocation) && showAlternate) setAlternate(false);
    }, [sticky, heroLocation, midLocation, showAlternate]);

    useEffect(() => {
        if(containerRef.current == null) return;

        containerRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if(containerRef.current == null) return;
            containerRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    return (
        <div ref={containerRef} className="snap-y snap-mandatory w-screen h-screen overflow-y-scroll">
            {children}
        </div>
    );
}