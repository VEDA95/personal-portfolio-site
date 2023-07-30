import { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import type { ReactElement, FC, PropsWithChildren, MutableRefObject } from 'react';


interface ProjectItemProps extends PropsWithChildren {
    id: string;
    img_url?: string;
    heading: string;
    description?: string;
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

export default function ProjectsSection(): ReactElement<FC> {
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
                    <animated.div className="grid grid-cols-2 md:grid-cols-4 w-3/4 md:w-[75rem] gap-x-4 transition-opacity transform-gpu" style={sectionSpringStyle}>
                        <ul className="grid auto-rows-[25rem] gap-y-4">
                            <ProjectItem id="test1" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test2" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test3" heading="test" description="Lorem Ipsum..." />
                        </ul>
                        <ul className="grid auto-rows-[25rem] gap-y-4 mt-10">
                            <ProjectItem id="test4" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test5" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test6" heading="test" description="Lorem Ipsum..." />
                        </ul>
                        <ul className="grid auto-rows-[25rem] gap-y-4">
                            <ProjectItem id="test7" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test8" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test9" heading="test" description="Lorem Ipsum..." />
                        </ul>
                        <ul className="grid auto-rows-[25rem] gap-y-4 mt-10">
                            <ProjectItem id="test10" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test11" heading="test" description="Lorem Ipsum..." />
                            <ProjectItem id="test12" heading="test" description="Lorem Ipsum..." />
                        </ul>
                    </animated.div>
                </div>
            </section>
        </Waypoint>
    );
}