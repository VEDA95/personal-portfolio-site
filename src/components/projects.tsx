import { useRef, useCallback, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import { ProjectItem } from './landing/projects';
import type { ReactElement, FC, MutableRefObject } from 'react';

export interface ProjectsListProps {
    data: Array<any>;
}

export default function ProjectsList({ data }: ProjectsListProps): ReactElement<any> {
    const springTimerRef: MutableRefObject<any> = useRef(null);
    const [springStyles, springApi] = useSpring({
        opacity: 0,
        translateY: '2.5rem',
        duration: 3000
    }, []);
    const handleEnter = useCallback(() => {
        springTimerRef.current = setTimeout(() => {
            springApi.start({
                opacity: 100,
                translateY: '0'
            });
        }, 500);
    }, []);

    useEffect(() => {
        return () => {
            if(springTimerRef.current != null) clearTimeout(springTimerRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <div className="flex flex-col w-full py-20 items-center">
                <animated.ul
                    className="grid gap-4 w-3/4 transition-opacity transform-gpu auto-rows-[25rem] grid-cols-[repeat(1,_17.5rem)] sm:grid-cols-[repeat(2,_50%)] md:grid-cols-[repeat(auto-fill,_18.75rem)] justify-center"
                    style={springStyles}>
                    {data.map((item: any, index: number): ReactElement<FC> => {
                        return (
                            <ProjectItem key={`project-panel-${index + 1}`} heading={item.name} id={item.id} img_id={item.panelimg}>
                                <p className="line-clamp-3 text-center">{item.shortdescription}</p>
                            </ProjectItem>
                        );
                    })}
                </animated.ul>
            </div>
        </Waypoint>
    );
}