import { useCallback, Fragment } from 'react';
import { useBannerState } from '../state/banner';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import type { ReactElement, FC } from 'react';

export default function Banner(): ReactElement<FC> {
	const [message, open, bannerType, setOpen, clearMessage, clearType] = useBannerState((state) => [
		state.message,
		state.open,
		state.type,
		state.setOpen,
		state.clearMessage,
		state.clearType
	]);
	const handleClick = useCallback((): void => {
		setOpen(false);
		clearMessage();
	}, [bannerType]);
    const bannerClasses: string = classNames('pointer-events-auto flex flex-row items-center justify-between gap-x-6 overflow-hidden rounded-xl py-3 pl-4 pr-3.5 w-[35rem] h-12 md:px-6 md:py-2.5', {
        'bg-amber-500': bannerType === 'error',
        'bg-dark-red': bannerType === 'success'
    });

	return (
		<Transition show={open} as={Fragment}>
			<div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center px-6 pb-5 lg:px-8 h-14">
				<Transition.Child
					as={Fragment}
					enter="transition duration-300"
					enterFrom="transform-gpu opacity-0 -translate-y-3"
					enterTo="transform-gpu opacity-100 translate-y-0"
					leave="transition ease-in duration-400"
					leaveFrom="transform-gpu opacity-100 scale-100"
					leaveTo="transform-gpu opacity-0 scale-95">
					<div className={bannerClasses}>
						<p className="text-sm leading-6 line-clamp-3 w-full">{message}</p>
						<button type="button" onClick={handleClick} className="flex flex-col -m-1.5 flex-none p-1.5 justify-center items-center">
							<span className="sr-only">Dismiss</span>
							<FontAwesomeIcon icon={faXmark} className="h-5 w-5 hover:text-neutral-300" />
						</button>
					</div>
				</Transition.Child>
			</div>
		</Transition>
	);
}
