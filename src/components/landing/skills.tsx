import { useEffect, useRef, useCallback, useState } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import useMidState from '../../state/mid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import type { ReactElement, FC, MutableRefObject } from 'react';
import type { IconName } from '@fortawesome/fontawesome-svg-core';

export interface SkillPanelProps {
    name: string;
    description: string;
    icon: string | null;
    style?: {
        [index: string]: any;
    }
}

interface ISkillSectionItem {
    id: string;
    date_created: string;
    date_updated: string | null;
    name: string;
    icon: string | null;
    category: string;
    longdescription: string | null;
    shortdescription: string | null;
    page_id: string | null;
}

export interface SkillSectionProps {
    data: Array<ISkillSectionItem>;
}

library.add(far, fab);

export function SkillPanel({icon, name, description, style = {}}: SkillPanelProps): ReactElement<FC> {
    const [mounted, setMount] = useState<boolean>(false);

    useEffect(() => {
        setMount(true);
    }, []);

    return(
        <li className="flex flex-col">
            <animated.div
                style={style}
                className="flex flex-col w-full h-full justify-center overflow-hidden rounded-lg transform-gpu transition-opacity ease-in bg-neutral-900 hover:bg-neutral-800">
                    {icon != null && mounted ? (
                        <div className="flex flex-row w-full justify-center pb-2">
                            <FontAwesomeIcon icon={icon as IconName} className="w-12 h-12" />
                        </div>
                    ) : null}
                    <div className="flex flex-row w-full pb-2 justify-center">
                        <h2 className="font-semibold text-dark-red text-2xl text-center">{name}</h2>
                    </div>
                    <div className="flex flex-row w-full px-2 justify-center">
                        <p className="line-clamp-4 text-center text-sm">{description}</p>
                    </div>
            </animated.div>
        </li>
    );
}


export default function SkillsSection({ data }: SkillSectionProps): ReactElement<FC> {
    const sectionRef: MutableRefObject<any> = useRef(null);
    const panelTimerRef: MutableRefObject<any> = useRef(null);
    const setLocation = useMidState((state) => state.setLocation);
    const [panelSpringTrail, panelApi] = useTrail(data.length ?? 0, {
        transform: 'scale(0.95)',
        opacity: 0,
        duration: 1500
    }, []);
    const handleEnter = useCallback(() => {
        panelTimerRef.current = setTimeout(() => {
            panelApi.start({
                transform: 'scale(1.0)',
                opacity: 100
            });
        }, 1000);
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
            <section ref={sectionRef} className="flex flex-col w-full min-h-landing-panel mt-32 bg-crimson-red px-6 md:px-8">
                <div className="flex flex-row w-full pt-16">
                    <h1 className="text-6xl font-bold">Skills</h1>
                </div>
                <div className="flex flex-col w-full items-center py-20 md:py-24">
                    <ul className="grid w-full grid-cols-[repeat(2,_50%)] md:grid-cols-[repeat(auto-fit,_15rem)] auto-rows-[15rem] gap-4 justify-center">
                        {panelSpringTrail.map((panelStyle, index) => <SkillPanel key={`panel-${index + 1}`} icon={data[index].icon} name={data[index].name ?? ''} description={data[index].shortdescription ?? ''} style={panelStyle} />)}
                    </ul>
                </div>
            </section>
        </Waypoint>
    );
}