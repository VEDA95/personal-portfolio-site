import { useEffect, useRef, useCallback } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import useMidState from '../state/mid';
import type { ReactElement, FC, MutableRefObject } from 'react';

export interface SkillPanelProps {
    name: string;
    description: string;
    style?: {
        [index: string]: any;
    }
}


export function SkillPanel({name, description, style = {}}: SkillPanelProps): ReactElement<FC> {
    return(
        <li className="flex flex-col">
            <animated.div
                style={style}
                className="flex flex-col w-full h-full overflow-hidden rounded-lg transform-gpu transition-opacity justify-center bg-neutral-900 hover:bg-neutral-800">
                    <div className="flex flex-row w-full justify-center">
                        <h2 className="font-semibold text-dark-red text-4xl">{name}</h2>
                    </div>
                    <div className="flex flex-row w-full justify-center">
                        <p className="text-lg">{description}</p>
                    </div>
            </animated.div>
        </li>
    );
}


export default function SkillsSection(): ReactElement<FC> {
    const sectionRef: MutableRefObject<any> = useRef(null);
    const panelTimerRef: MutableRefObject<any> = useRef(null);
    const setLocation = useMidState((state) => state.setLocation);
    const [panelSpringTrail, panelApi] = useTrail(3, {
        transform: 'scale(0.5)',
        opacity: 0,
        duration: 500
    }, []);
    const handleEnter = useCallback(() => {
        panelTimerRef.current = setTimeout(() => {
            panelApi.start({
                transform: 'scale(1.0)',
                opacity: 100
            });
        }, 2000);
    }, []);

    useEffect(() => {
        if(sectionRef.current != null) {
            const {top, height} = sectionRef.current.getBoundingClientRect();
            setLocation((top + window.scrollY) + (height / (height * 0.25)));
        }

        return () => {
            if(panelTimerRef.current != null) clearTimeout(panelTimerRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <section ref={sectionRef} className="flex flex-col w-full min-h-[calc(100vh_-_7rem)] mt-32 bg-crimson-red px-6 md:px-12">
                <div className="flex flex-row w-full pt-16">
                    <h1 className="text-6xl font-bold">Skills</h1>
                </div>
                <div className="flex flex-col w-full items-center pt-24">
                    <ul className="grid grid-flow-col auto-cols-[15rem] auto-rows-[15rem] gap-4 w-1/2 justify-center">
                        {panelSpringTrail.map((panelStyle, index) => <SkillPanel key={`panel-${index + 1}`} name="Hello" description="World" style={panelStyle} />)}
                    </ul>
                </div>
            </section>
        </Waypoint>
    );
}