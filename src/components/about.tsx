import { useEffect, useCallback, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import type { ReactElement, FC, MutableRefObject } from 'react';

export default function AboutSection(): ReactElement<FC> {
    const headingTimeRef: MutableRefObject<any> = useRef<any>(null);
    const contentTimeRef: MutableRefObject<any> = useRef<any>(null);
    const [headingSpringStyles, headingApi] = useSpring({
        translateX: '-2rem',
        opacity: 0,
        duration: 3000
    }, []);
    const [contentSpringStyles, contentApi] = useSpring({
        translateY: '2rem',
        opacity: 0,
        duration: 3000
    }, []);
    const handleEnter = useCallback(() => {
        headingTimeRef.current = setTimeout(() => {
            headingApi.start({translateX: '0', opacity: 100});
        }, 500);
        contentTimeRef.current = setTimeout(() => {
            contentApi.start({translateY: '0', opacity: 100});
        }, 500);
    }, []);

    useEffect(() => {
        return () => {
            if(headingTimeRef.current != null) clearTimeout(headingTimeRef.current);
            if(contentTimeRef.current != null) clearTimeout(contentTimeRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <section className="flex flex-row w-full h-[calc(100vh_-_7rem)] justify-center mt-32">
                <div className='flex flex-row w-1/4 pt-16'>
                    <animated.h1
                        className="font-bold text-6xl transform-gpu transition-opacity ease-in"
                        style={headingSpringStyles}>
                        About Me
                    </animated.h1>
                </div>
                <article className="flex flex-col w-1/2 h-full justify-end">
                    <animated.div
                        className="transition-opacity transform-gpu ease-in"
                        style={contentSpringStyles}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="pt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="pt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="pt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="pt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </animated.div>
                </article>
            </section>
        </Waypoint>
    );
}