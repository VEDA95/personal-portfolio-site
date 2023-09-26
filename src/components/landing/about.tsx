import { useEffect, useCallback, useRef, useMemo } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import type { ReactElement, FC, MutableRefObject } from 'react';
import type { Blocks } from '../../data/types/block.ts';

export interface AboutSectionProps {
    data: Blocks;
}

export default function AboutSection({ data }: AboutSectionProps): ReactElement<FC> {
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
    const [header, content] = useMemo<[ISectionBlock | null, Array<ISectionBlock>]>(() => {
        const header: ISectionBlock | undefined = data.blocks.find((item: ISectionBlock): boolean => item.type === 'header' && item.data.level === 1);
        const content: Array<ISectionBlock> = data.blocks.filter((item: ISectionBlock): boolean => item.type !== 'header' || (item.type === 'header' && item.data.level !== 1));

        return [header ?? null, content];
    }, [data]);

    useEffect(() => {
        return () => {
            if(headingTimeRef.current != null) clearTimeout(headingTimeRef.current);
            if(contentTimeRef.current != null) clearTimeout(contentTimeRef.current);
        };
    }, []);

    return (
        <Waypoint onEnter={handleEnter}>
            <section className="flex flex-col w-full min-h-landing-panel justify-center mt-32 px-6 md:px-8">
                <div className="flex flex-row w-full pt-16 pl-0 md:pl-48 justify-center md:justify-start">
                    <animated.h1
                        className="font-bold text-4xl md:text-6xl transform-gpu transition-opacity ease-in"
                        style={headingSpringStyles}>
                        {header?.data.text}
                    </animated.h1>
                </div>
                <div className='flex flex-row w-full justify-center md:justify-end pt-16 pr-0 md:pr-16'>
                    <article className="flex flex-col w-full sm:w-3/4 md:w-1/2 min-h-full justify-end">
                        <animated.div
                            className="transition-opacity transform-gpu ease-in"
                            style={contentSpringStyles}>
                            {content.map((item: ISectionBlock, index: number): ReactElement<FC> => {
                                if(index === 0) return <p key={`about-content-para-${index + 1}`} className="text-center">{item.data.text}</p>;

                                return <p key={`about-content-para-${index + 1}`} className="pt-4 text-center">{item.data.text}</p>;
                            })}
                        </animated.div>
                    </article>
                </div>
            </section>
        </Waypoint>
    );
}