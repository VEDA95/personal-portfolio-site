import { useEffect, useRef, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import HireBadge from './hireBadge';
import type {ReactElement, FC, MutableRefObject} from 'react';

export default function HeroSection(): ReactElement<FC> {
    const heroRef: MutableRefObject<any> = useRef(null);
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
            top: heroRef.current.clientHeight + 16,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        const headingTimeout = setTimeout(() => {
            headingApi.start({translateY: '-1.75rem', opacity: 100});
        }, 2000);
        const subHeadingTimeout = setTimeout(() => {
            subHeadingApi.start({translateY: '-1.5rem', opacity: 100});
        }, 2500);
        const scrollButtonTimeout = setTimeout(() => {
            scrollButtonApi.start({translateY: '2.5rem', opacity: 100});
        }, 2500);

        return () => {
            clearTimeout(headingTimeout);
            clearTimeout(subHeadingTimeout);
            clearTimeout(scrollButtonTimeout);
        };
    }, []);

    return (
        <div ref={heroRef} className="flex flex-row w-screen h-[calc(100vh_-_7rem)] justify-center">
            <div className="flex flex-col w-3/4 justify-between">
                <div className="flex flex-col w-full h-40 mt-52 items-start justify-end">
                    <animated.h1
                        className="font-bold text-6xl transform-gpu transition-opacity ease-in"
                        style={headingSpringStyles}>
                        Stefan Netterfield
                    </animated.h1>
                    <animated.div className="pl-8 transform-gpu transition-opacity ease-in" style={subHeadingSpringStyles}>
                        <h2 className="font-thin text-3xl">Dedicated FullStack Developer</h2>
                        <div className="pt-1 opacity-90">
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
        </div>
    );
}