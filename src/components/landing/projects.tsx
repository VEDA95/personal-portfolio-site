import { useCallback, useEffect, useRef, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import classNames from 'classnames';
import type { ReactElement, FC, PropsWithChildren, MutableRefObject } from 'react';


interface ProjectItemProps extends PropsWithChildren {
    id: string;
    img_url?: string;
    heading: string;
    description?: string;
}

interface IProjectSectionItem {
    id: string;
    date_created: string;
    date_updated: string | null;
    name: string;
    longdescription: string | null;
    shortdescription: string | null;
    panelimg: string | null;
    page_id: string | null;
}

type ProjectDataType = Array<IProjectSectionItem>;
export interface ProjectProps {
    data: ProjectDataType;
}

function ProjectItem({ id, heading, description, children }: ProjectItemProps): ReactElement<FC> {
    return (
        <li className="flex flex-col bg-neutral-200 text-neutral-900 overflow-clip rounded-md transition-colors group duration-300 ease-in hover:cursor-pointer hover:bg-dark-red hover:text-neutral-200">
            <a href={`/projects/${id}`} className="w-full h-full">
                <div className="block w-full h-60 bg-neutral-500 transition-colors duration-300 group-hover:bg-neutral-700 ease-in" />
                <div className="flex flex-row w-full justify-center pt-6">
                    <h2 className="font-bold text-3xl text-dark-red group-hover:text-neutral-200 transition-colors duration-300 ease-in">{heading}</h2>
                </div>
                <div className="flex flex-row w-full h-7 pt-3 px-3">
                    {children != null ? children : <p>{description}</p>}
                </div>
            </a>
        </li>
    );
}

export default function ProjectsSection({ data }: ProjectProps): ReactElement<FC> {
    const sectionSpringRef: MutableRefObject<any> = useRef(null);
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
    const [columnData1, columnData2, columnData3, columnData4] = useMemo<Array<ProjectDataType>>(() => {
        let output1: ProjectDataType = [];
        let output2: ProjectDataType = [];
        let output3: ProjectDataType = [];
        let output4: ProjectDataType = [];

        for(let index: number = 0; index < data.length; index++) {
            const item: IProjectSectionItem = {...data[index]};

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

        return [output1, output2, output3, output4];
    }, [data]);
    const gridClasses = classNames('grid gap-x-4 w-3/4 md:w-[75rem] transition-opacity transform-gpu', {
        'grid-cols-2 md:grid-cols-4': data.length >= 4,
        'grid-flow-col auto-cols-[50%] md:auto-cols-[18.75rem] justify-center': data.length < 4
    });

    useEffect(() => {
        return () => {
            if(sectionSpringRef.current != null) clearTimeout(sectionSpringRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <section className="flex flex-col w-full min-h-[calc(100vh_-_7rem)] items-center mt-32 px-6 pb-6 md:px-8 md:pb-8">
                <div className="flex flex-row w-full pt-16">
                    <h1 className="text-6xl font-bold">Projects</h1>
                </div>
                <div className="flex flex-row w-full pt-16 justify-center">
                    <animated.div className={gridClasses} style={sectionSpringStyle}>
                        {columnData1.length > 0 ? (
                            <ul className="grid auto-rows-[25rem] gap-y-4">
                                {columnData1.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-1`} id={item.id} heading={item.name}>
                                            <p>{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                        {columnData2.length > 0 ? (
                            <ul className="grid auto-rows-[25rem] gap-y-4 mt-10">
                                {columnData2.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-2`} id={item.id} heading={item.name}>
                                            <p>{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                        {columnData3.length > 0 ? (
                             <ul className="grid auto-rows-[25rem] gap-y-4">
                                {columnData3.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-3`} id={item.id} heading={item.name}>
                                            <p>{item.shortdescription}</p>
                                        </ProjectItem>
                                    );
                                })}
                            </ul>
                        ) : null}
                        {columnData4.length > 0 ? (
                            <ul className="grid auto-rows-[25rem] gap-y-4 mt-10">
                                {columnData4.map((item: IProjectSectionItem, index: number): ReactElement<FC> => {
                                    return (
                                        <ProjectItem key={`project-item-${index + 1}-column-4`} id={item.id} heading={item.name}>
                                            <p>{item.shortdescription}</p>
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