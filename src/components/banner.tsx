import { useCallback } from 'react';
import { useBannerState } from '../state/banner';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import type { ReactElement, FC } from 'react';

export default function Banner(): ReactElement<FC> {
	const [message, open, bannerType, toggleOpen, clearMessage, clearType] = useBannerState((state) => [
		state.message,
		state.open,
		state.type,
		state.toggleOpen,
		state.clearMessage,
		state.clearType
	]);
	const handleClick = useCallback((): void => {
		toggleOpen();
		clearMessage();
        if(bannerType !== 'error') clearType();
	}, [bannerType]);
    const bannerClasses: string = classNames('pointer-events-auto flex items-center justify-between gap-x-6 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5', {
        'bg-amber-500': bannerType === 'error',
        'bg-dark-red': bannerType === 'success'
    });

	return (
		<div className="pointer-events-none absolute inset-x-0 top-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 h-14">
			<Transition
				show={open}
				enter="transition-opacity transform-gpu duration-75"
				enterFrom="opacity-0 -translate-y-3"
				enterTo="opacity-100 translate-y-0"
				leave="transition-opacity transform-gpu duration-75"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-50"
			>
				<div className={bannerClasses}>
					<p className="text-sm leading-6 line-clamp-1">{message}</p>
					<button type="button" onClick={handleClick} className="-m-1.5 flex-none p-1.5">
						<span className="sr-only">Dismiss</span>
						<FontAwesomeIcon icon={faXmark} className="h-5 w-5 hover:text-neutral-400" />
					</button>
				</div>
			</Transition>
		</div>
	);
}
