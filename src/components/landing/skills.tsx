import { useEffect, useRef, useCallback, useState } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import useMidState from '../../state/mid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';
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

library.add(far)

export function SkillPanel({icon, name, description, style = {}}: SkillPanelProps): ReactElement<FC> {
    const [mounted, setMount] = useState<boolean>(false);
    const descriptionClasses: string = classNames('flex flex-row w-full justify-center', {
        'mb-10': icon != null && mounted
    });

    useEffect(() => {
        setMount(true);
    }, []);

    return(
        <li className="flex flex-col">
            <animated.div
                style={style}
                className="flex flex-col w-full h-full overflow-hidden rounded-lg transform-gpu transition-opacity justify-center bg-neutral-900 hover:bg-neutral-800">
                    {icon != null && mounted ? (
                        <div className="flex flex-row w-full justify-center pb-2">
                            <FontAwesomeIcon icon={{prefix: 'far', iconName: icon as IconName}} className="w-8 h-8" />
                        </div>
                    ) : null}
                    <div className="flex flex-row w-full justify-center">
                        <h2 className="font-semibold text-dark-red text-4xl">{name}</h2>
                    </div>
                    <div className={descriptionClasses}>
                        <p className="text-lg">{description}</p>
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
            <section ref={sectionRef} className="flex flex-col w-full min-h-[calc(100vh_-_7rem)] mt-32 bg-crimson-red px-6 md:px-8">
                <div className="flex flex-row w-full pt-16">
                    <h1 className="text-6xl font-bold">Skills</h1>
                </div>
                <div className="flex flex-col w-full items-center pt-20 md:pt-24">
                    <ul className="grid grid-cols-2 md:grid-cols-none md:grid-flow-col md:auto-cols-[15rem] auto-rows-[15rem] gap-4 w-4/6 md:w-1/2 justify-center">
                        {panelSpringTrail.map((panelStyle, index) => <SkillPanel key={`panel-${index + 1}`} icon={data[index].icon} name={data[index].name ?? ''} description={data[index].shortdescription ?? ''} style={panelStyle} />)}
                    </ul>
                </div>
            </section>
        </Waypoint>
    );
}