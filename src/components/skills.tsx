import { useEffect, useRef, useCallback, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';
import type { ReactElement, FC, MutableRefObject } from 'react';
import type { IconName } from '@fortawesome/fontawesome-svg-core';

export interface SkillProps {
    skills: Array<any>;
}

export interface IGenericObject {
    [index: string]: any;
}

export interface SkillPanelProps {
    heading: string,
    icon: string | null;
    content: string | null;
    style: IGenericObject;
    alignContent: 'left' | 'right';
}

library.add(far, fab);

export function SkillPanel({ style, heading, icon, alignContent, content }: SkillPanelProps): ReactElement<FC> {
    const [mounted, setMount] = useState<boolean>(false);
    const headingContainerClasses: string = classNames('flex flex-row w-full items-center pb-4', {
        'justify-start': alignContent === 'left',
        'justify-end': alignContent === 'right'
    });
    const contentClasses: string = classNames('text-lg', {
        'text-left': alignContent === 'left',
        'text-right': alignContent === 'right'
    });

    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <animated.div className="flex flex-col w-full md:w-1/2 min-h-[20rem] p-8 bg-crimson-red overflow-hidden rounded-xl transition-opacity transform-gpu mb-8 md:mb-16" style={style}>
            <div className={headingContainerClasses}>
                {icon != null && mounted && alignContent === 'left' ? (
                    <FontAwesomeIcon icon={icon as IconName} className="w-12 h-12 pr-4" />
                ) : null}
                <h2 className="font-bold text-4xl">{heading}</h2>
                {icon != null && mounted && alignContent === 'right' ? (
                    <FontAwesomeIcon icon={icon as IconName} className="w-12 h-12 pl-4" />
                ) : null}
            </div>
            {content != null ? (
                <div className="flex flex-row w-full">
                    <p className={contentClasses} dangerouslySetInnerHTML={{__html: content}} />
                </div>
            ) : null}
        </animated.div>
    );
}

export default function SkillComponent({ skills }: SkillProps): ReactElement<FC> {
    const leftTimerRef: MutableRefObject<any> = useRef(null);
    const rightTimerRef: MutableRefObject<any> = useRef(null);
    const [leftSpringStyles, leftApi] = useSpring({
        opacity: 0,
        translateX: '-5rem',
        duration: 3000
    }, []);
    const [righttSpringStyles, righttApi] = useSpring({
        opacity: 0,
        translateX: '5rem',
        duration: 3000
    }, []);
    const handleEnter = useCallback(() => {
        leftTimerRef.current = setTimeout(() => {
            leftApi.start({
                opacity: 100,
                translateX: '0'
            });
        }, 500);
        leftTimerRef.current = setTimeout(() => {
            righttApi.start({
                opacity: 100,
                translateX: '0'
            });
        }, 500);
    }, []);

    useEffect(() => {
        return () => {
            if(leftTimerRef.current != null) clearTimeout(leftTimerRef.current);
            if(rightTimerRef.current != null) clearTimeout(rightTimerRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <div className="flex flex-col w-full px-6 md:px-12 pt-48 md:pt-60">
                {skills.map((item: any, index: number): ReactElement<FC> => {
                    const isEven: boolean = index % 2 === 0;
                    const keyIndex: number = index + 1;
                    const panelStyles: IGenericObject = isEven ? leftSpringStyles : righttSpringStyles;
                    const alignment: 'left' | 'right' = isEven ? 'left' : 'right';
                    const containerClasses: string = classNames('flex flex-row w-full', {
                        'justify-start': isEven,
                        'justify-end': !isEven
                    });

                    return (
                        <div key={`panel-container-${keyIndex}`} className={containerClasses}>
                            <SkillPanel
                                key={`panel-${keyIndex}`}
                                style={panelStyles}
                                alignContent={alignment}
                                heading={item.name}
                                icon={item.icon}
                                content={item.longdescription} />
                        </div>
                    );
                })}
            </div>
        </Waypoint>
    );
}