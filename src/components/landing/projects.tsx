import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import classNames from 'classnames';
import type { ReactElement, FC, PropsWithChildren, MutableRefObject } from 'react';
import type Projects from '../../data/types/projects';

type ViewPortQueryType = '' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface ProjectProps {
    data: Projects;
}

export function ProjectItem({ id, heading, description, children, img_id, topMargin = false }: ProjectItemProps): ReactElement<FC> {
    const containerClasses: string = classNames('flex flex-col bg-neutral-200 text-neutral-900 overflow-clip rounded-md transition-colors group duration-300 ease-in hover:cursor-pointer hover:bg-dark-red hover:text-neutral-200', {
        'mt-4 md:mt-10': topMargin
    });

    return (
        <li className={containerClasses}>
            <a href={`/projects/${id}`} className="w-full h-full">
                {img_id != null ? (
                    <div className="block w-full h-60 relative">
                        <div className="block absolute inset-0 z-20 transition-opacity ease-in duration-300 bg-neutral-700 opacity-0 group-hover:opacity-75" />
                        <img src={`${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${img_id}`} className="w-full h-full" />
                    </div>
                ) : (
                    <div className="block w-full h-60 bg-neutral-500 transition-colors duration-300 group-hover:bg-neutral-700 ease-in" />
                )}
                <div className="flex flex-row w-full justify-center pt-6">
                    <h2 className="font-bold text-3xl text-dark-red group-hover:text-neutral-200 transition-colors duration-300 ease-in">{heading}</h2>
                </div>
                <div className="flex flex-row w-full pt-3 px-3">
                    {children != null ? children : <p>{description}</p>}
                </div>
            </a>
        </li>
    );
}

export default function ProjectsSection({ data }: ProjectProps): ReactElement<FC> {
    const sectionSpringRef: MutableRefObject<any> = useRef(null);
    const [viewPortQuery, setViewPortQuery] = useState<ViewPortQueryType>('');
    const [sectionSpringStyle, sectionSpringApi] = useSpring({
        translateY: '5rem',
        opacity: 0,
        duration: 3000
    }, []);
    const handleEnter = useCallback(() => {
        sectionSpringRef.current = setTimeout(() => {
            sectionSpringApi.start({
                translateY: '0',
                opacity: 100
            });
        }, 2000);
    }, []);
    const handleResize = useCallback((): void => {
        const { innerWidth } = window;

        if(innerWidth >= 1536 && viewPortQuery !== '2xl') {
            setViewPortQuery('2xl');
            return;
        }
        if(innerWidth >= 1280 && viewPortQuery !== 'xl') {
            setViewPortQuery('xl');
            return;
        }
        if(innerWidth >= 1024 && viewPortQuery !== 'lg') {
            setViewPortQuery('lg');
            return;
        }
        if(innerWidth >= 768 && viewPortQuery !== 'md') {
            setViewPortQuery('md');
            return;
        }
        if(innerWidth >= 640 && viewPortQuery !== 'sm') {
            setViewPortQuery('sm');
            return;
        }
        if(innerWidth < 640 && viewPortQuery !== 'xs') {
            setViewPortQuery('xs');
            return;
        }
    }, [viewPortQuery]);
    const [columnData1, columnData2, columnData3, columnData4] = useMemo<Array<ProjectDataType>>(() => {
        let output1: ProjectDataType = [];
        let output2: ProjectDataType = [];
        let output3: ProjectDataType = [];
        let output4: ProjectDataType = [];
        let index: number;
        let item: IProjectSectionItem;

        if(viewPortQuery === 'md') {
            console.log(viewPortQuery);
            for(index = 0; index < data.length; index++) {
                item = {...data[index]};

                if(index % 2 === 0) {
                    if(output1.length === output3.length) {
                        output1 = [...output1, item];
                        continue;
                    }

                    output3 = [...output3, item];
                    continue;
                }

                output2 = [...output2, item];
            }
        } else if(viewPortQuery === 'sm') {
            for(item of data) {
                if(output1.length === output2.length) {
                    output1 = [...output1, item];
                    continue;
                }

                output2 = [...output2, item];
            }
        } else if(viewPortQuery === 'xs') {
            output1 = [...data];
        } else {
            for(index = 0; index < data.length; index++) {
                item = {...data[index]};

                if(index % 2 === 0) {
                    if(output1.length === output3.length) {
                        output1 = [...output1, item];
                        continue;
                    }

                    output3 = [...output3, item];
                    continue;
                }

                if(output2.length === output4.length) {
                    output2 = [...output2, item];
                    continue;
                }

                output4 = [...output4, item];
            }
        }

        return [output1, output2, output3, output4];
    }, [data, viewPortQuery]);
    const gridClasses = classNames('grid gap-x-4 w-3/4 sm:w-full md:w-[75rem] transition-opacity transform-gpu', {
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': data.length >= 4,
        'grid-cols-1 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-[50%] md:auto-cols-[18.75rem] justify-center': data.length < 4
    });

    useEffect(() => {
        window.addEventListener('resize', handleResize, {passive: true});

        return () => {
            window.removeEventListener('resize', handleResize);
            if(sectionSpringRef.current != null) clearTimeout(sectionSpringRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <section className="flex flex-col w-full min-h-landing-panel items-center mt-32 px-6 pb-6 md:px-8 md:pb-8">
                <div className="flex flex-row w-full pt-16 justify-center md:justify-start">
                    <h1 className="text-6xl font-bold">Projects</h1>
                </div>
                <div className="flex flex-row w-full pt-16 justify-center">
                    <animated.div className={gridClasses} style={sectionSpringStyle}>
                        {columnData1.length > 0 ? (
                            <ul className="grid auto-rows-[25rem] gap-y-4">
                                {columnData1.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-1`} id={item.id} heading={item.name} img_id={item.panelimg}>
                                            <p className="line-clamp-3 text-center">{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                        {columnData2.length > 0 ? (
                            <ul className="grid auto-rows-[25rem] gap-y-4 mt-4 sm:mt-10">
                                {columnData2.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-2`} id={item.id} heading={item.name} img_id={item.panelimg}>
                                            <p className="line-clamp-3 text-center">{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                        {columnData3.length > 0 ? (
                             <ul className="grid auto-rows-[25rem] gap-y-4">
                                {columnData3.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-3`} id={item.id} heading={item.name} img_id={item.panelimg}>
                                            <p className="line-clamp-3 text-center">{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                        {columnData4.length > 0 ? (
                            <ul className="grid auto-rows-[25rem] gap-y-4 mt-4 sm:mt-10">
                                {columnData4.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-4`} id={item.id} heading={item.name} img_id={item.panelimg}>
                                            <p className="line-clamp-3 text-center">{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </animated.div>
                </div>
            </section>
        </Waypoint>
    );
}