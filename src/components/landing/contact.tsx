import { useEffect, useRef, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import HireBadge from '../layout/hireBadge';
import type { ReactElement, FC, MutableRefObject } from 'react';


export default function ContactSection(): ReactElement<FC> {
    const headingSpringRef: MutableRefObject<any> = useRef(null);
    const contactSpringRef: MutableRefObject<any> = useRef(null);
    const [headingSpringStyle, headingSpringApi] = useSpring({
        translateY: '-3.375rem',
        opacity: 0,
        duration: 3000
    }, []);
    const [contactSpringStyle, contactSpringApi] = useSpring({
        translateY: '1.875rem',
        opacity: 0,
        duration: 3000
    }, []);
    const handleEnter = useCallback(() => {
        headingSpringRef.current = setTimeout(() => {
            headingSpringApi.start({
                translateY: '0',
                opacity: 100
            });
        }, 2000);
        contactSpringRef.current = setTimeout(() => {
            contactSpringApi.start({
                translateY: '0',
                opacity: 100
            });
        }, 2500);
    }, []);

    useEffect(() => {
        return () => {
            if(headingSpringRef.current != null) clearTimeout(headingSpringRef.current);
            if(contactSpringRef.current != null) clearTimeout(contactSpringRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <section className="flex flex-col w-full min-h-landing-panel justify-center mt-32 px-6 pb-6 md:px-8 md:pb-8">
                <div className="flex flex-col w-full h-52 justify-center mt-24 pl-8">
                    <animated.div className="flex flex-col w-full transition-opacity transform-gpu" style={headingSpringStyle}>
                        <h1 className="text-6xl font-bold">Want to get in touch?</h1>
                        <div className="flex flex-row w-full pl-3 pt-3">
                            <HireBadge />
                        </div>
                    </animated.div>
                </div>
                <div className="flex flex-col w-full mt-40 h-48">
                    <animated.div className="flex flex-col w-full items-center transition-opacity transform-gpu" style={contactSpringStyle}>
                        <a href="/contact" className="w-40 text-2xl rounded-full bg-neutral-200 text-neutral-900 p-3 transition-colors ease-in hover:bg-dark-red hover:text-neutral-200">Contact Me</a>
                        <span className="font-light pt-5 text-lg">Available from</span>
                        <span className="text-lg">9:00 AM - 9:00 PM EST.</span>
                    </animated.div>
                </div>
            </section>
        </Waypoint>
    );
}