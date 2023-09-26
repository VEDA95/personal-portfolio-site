import { useCallback } from 'react';
import { useScrollToState } from '../../state/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareChevronUp } from '@fortawesome/pro-solid-svg-icons';
import type { ReactElement, FC } from 'react';

export default function UpSection(): ReactElement<FC> {
    const setScrollType = useScrollToState((state) => state.setScrollType);
    const handleClick = useCallback((): void => setScrollType('beginning'), []);

    return (
        <div className="flex flex-row w-full justify-end px-6 md:px-16">
            <button type="button" className="flex flex-col items-center justify-center" onClick={handleClick}>
                <FontAwesomeIcon icon={faSquareChevronUp} className="w-8 h-8 transition-colors duration-300 hover:text-dark-red"  />
            </button>
        </div>
    );
}