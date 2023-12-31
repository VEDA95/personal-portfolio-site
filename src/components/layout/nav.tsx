import { Fragment, useCallback, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';
import useNavState from '../../state/nav';
import type { ReactElement, FC, JSX } from 'react';

interface NavProps {
    navLinkList?: JSX.Element;
    siteIcon?: JSX.Element;
}

export function NavBar({navLinkList, siteIcon}: NavProps): ReactElement<FC> {
	const [sticky, setOffCanvas] = useNavState((state) => [state.sticky, state.setOffCanvas]);
    const [hasMounted, setHasMounted] = useState<boolean>(false);
	const handleClick = useCallback(() => setOffCanvas(true), []);
    const navClasses: string = classNames({
        'bg-transparent': !sticky || !hasMounted,
        'fixed inset-x-0 top-0 bg-[rgba(38,_38,_38,_0.6)] z-20': sticky && hasMounted
    });

    useEffect(() => {
        setHasMounted(true);
    }, []);

	return (
        <div className="flex flex-col w-full h-[9.025rem]">
            <header className={navClasses}>
                <nav className="mx-2 md:mx-4 flex flex-row items-center justify-between py-2 px-6 lg:px-8" aria-label="Global">
                    <a href="/" className="p-1.5">
                        <span className="sr-only">Stefan's Corner</span>
                        {siteIcon}
                    </a>
                    <div className="flex md:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ease-linear hover:text-dark-red" onClick={handleClick}>
                            <span className="sr-only">Open main menu</span>
                            <FontAwesomeIcon icon={faBars} className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    {navLinkList}
                </nav>
            </header>
        </div>
	);
}

export function PrimaryOffCanvasMenu({siteIcon, navLinkList}: NavProps): ReactElement<FC> {
	const [offCanvas, setOffCanvas] = useNavState((state) => [state.offCanvas, state.setOffCanvas]);
	const handleClick = useCallback(() => setOffCanvas(false), []);

	return (
		<Transition.Root show={offCanvas} as={Fragment}>
			<Dialog as="div" className="md:hidden" onClose={setOffCanvas}>
				<Transition.Child
                        as={Fragment}
                        enter="transition transform transform-gpu duration-200"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-100 scale-100"
                        leave="transition transform transform-gpu duration-400"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-50">
					<Dialog.Panel className="fixed inset-0 z-30 w-full overflow-y-auto px-6 py-6 bg-neutral-800 text-neutral-200">
						<div className="flex items-center justify-between">
                            <a href="/" className="p-1.5">
                                <span className="sr-only">Stefan's Corner</span>
                                {siteIcon}
                            </a>
							<button type="button" className="-m-2.5 rounded-md p-2.5 transition-colors ease-linear hover:text-dark-red" onClick={handleClick}>
								<span className="sr-only">Close menu</span>
								<FontAwesomeIcon icon={faXmark} className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
                                {navLinkList}
							</div>
						</div>
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
}

export function SecondaryOffCanvasMenu({ siteIcon, navLinkList }: NavProps): ReactElement<FC> {
    const [offCanvas, setOffCanvas] = useNavState((state) => [state.offCanvas, state.setOffCanvas]);
	const handleClick = useCallback(() => setOffCanvas(false), []);

    return (
        <Transition.Root show={offCanvas} as={Fragment}>
			<Dialog as="div" className="md:hidden" onClose={setOffCanvas}>
                <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="block fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" onClick={handleClick} />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden z-30">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                    as={Fragment}
                                    enter="transform transform-gpu transition ease-in-out duration-500 sm:duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform tansform-gpu transition ease-in-out duration-500 sm:duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full">
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-neutral-700 text-neutral-200">
                                    <div className="flex items-center justify-between p-4">
                                        <a href="/" className="-m-1.5 p-1.5">
                                        <span className="sr-only">Stefan's Corner</span>
                                        {siteIcon}
                                        </a>
                                        <button type="button" className="-m-2.5 rounded-md p-2.5 transition-colors ease-linear hover:text-dark-red" onClick={handleClick}>
                                            <span className="sr-only">Close menu</span>
                                            <FontAwesomeIcon icon={faXmark} className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-6 flow-root">
                                        <div className="-my-6 divide-y divide-gray-500/10">
                                            {navLinkList}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
			</Dialog>
		</Transition.Root>
    );
}
