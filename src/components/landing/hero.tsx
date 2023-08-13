import { useEffect, useRef, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import useNavState from '../../state/nav';
import HireBadge from '../layout/hireBadge';
import type {ReactElement, FC, MutableRefObject} from 'react';

export default function HeroSection(): ReactElement<FC> {
    const heroRef: MutableRefObject<any> = useRef(null);
    const headingTimerRef: MutableRefObject<any> = useRef(null);
    const subHeadingTimerRef: MutableRefObject<any> = useRef(null);
    const scrollButtonTimerRef: MutableRefObject<any> = useRef(null);
    const [sticky, setSticky] = useNavState((state) => [state.sticky, state.setSticky]);
    const [headingSpringStyles, headingApi] = useSpring({
        translateY: '0',
        opacity: 0,
        duration: 3000
    }, []);
    const [subHeadingSpringStyles, subHeadingApi] = useSpring({
        translateY: '0',
        opacity: 0,
        duration: 3000
    }, []);
    const [scrollButtonSpringStyles, scrollButtonApi] = useSpring({
        translateY: '1.25rem',
        opacity: 0,
        duration: 200
    }, []);
    const handleClick = useCallback(() => {
        if(heroRef.current == null) return;

        window.scrollTo({
            left: 0,
            top: heroRef.current.clientHeight + 160,
            behavior: 'smooth'
        });
    }, []);
    const handleScroll = useCallback(() => {
        if(heroRef.current == null) return;
        if((window.scrollY <= heroRef.current.clientHeight) && sticky) setSticky(false);
        if((window.scrollY >= heroRef.current.clientHeight + 160) && !sticky) setSticky(true);
    }, [sticky]);
    const handleEnter = useCallback(() => {
        headingTimerRef.current = setTimeout(() => {
            headingApi.start({translateY: '-1.75rem', opacity: 100});
        }, 2000);
        subHeadingTimerRef.current = setTimeout(() => {
            subHeadingApi.start({translateY: '-1.5rem', opacity: 100});
        }, 2500);
        scrollButtonTimerRef.current = setTimeout(() => {
            scrollButtonApi.start({translateY: '2.5rem', opacity: 100});
        }, 2500);
    }, []);

    useEffect(() => {
        if(heroRef.current != null) {
            if(window.scrollY > heroRef.current.clientHeight) setSticky(true);
        }

        return () => {
            clearTimeout(headingTimerRef.current);
            clearTimeout(subHeadingTimerRef.current);
            clearTimeout(scrollButtonTimerRef.current);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Waypoint onEnter={handleEnter}>
            <section ref={heroRef} className="flex flex-row w-full h-[calc(100vh_-_7rem)] justify-center px-6 md:px-8">
                <div className="flex flex-col w-3/4 justify-between">
                    <div className="flex flex-col w-full h-40 mt-52 items-center md:items-start justify-end">
                        <animated.h1
                            className="font-bold text-3xl sm:text-5xl transform-gpu transition-opacity ease-in md:text-6xl"
                            style={headingSpringStyles}>
                            Stefan Netterfield
                        </animated.h1>
                        <animated.div className="flex flex-col pl-4 md:pl-8 transform-gpu transition-opacity ease-in" style={subHeadingSpringStyles}>
                            <h2 className="font-thin text-xl sm:text-2xl md:text-3xl">Dedicated FullStack Developer</h2>
                            <div className="flex flex-row justify-center md:justify-start pt-1 opacity-90">
                                <HireBadge />
                            </div>
                        </animated.div>
                    </div>
                    <div className="flex flex-row justify-center w-full h-24">
                        <animated.button
                            type="button"
                            onClick={handleClick}
                            className="h-12 bg-neutral-200 text-sm text-neutral-800 rounded-full p-3 mb-2 transition transform-gpu ease-linear hover:bg-dark-red hover:text-neutral-200 align-middle"
                            style={scrollButtonSpringStyles}>
                            Scroll Down <FontAwesomeIcon icon={faChevronDown} />
                        </animated.button>
                    </div>
                </div>
            </section>
        </Waypoint>
    );
}