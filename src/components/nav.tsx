import { Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';
import useNavState from '../state/nav';
import type { ReactElement, FC, PropsWithChildren } from 'react';


export function NavBar({children}: PropsWithChildren): ReactElement<FC> {
	const [sticky, setOffCanvas] = useNavState((state) => [state.sticky, state.setOffCanvas]);
	const handleClick = useCallback(() => setOffCanvas(true), []);
    const navClasses: string = classNames({
        'bg-transparent': !sticky,
        'fixed inset-x-0 top-0 bg-[rgba(38,_38,_38,_0.6)]': sticky
    });

	return (
		<header className={navClasses}>
			<nav className="mx-2 md:mx-4 flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<a href="#" className="-m-1.5 p-1.5">
					<span className="sr-only">Your Company</span>
					<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
				</a>
				<div className="flex md:hidden">
					<button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" onClick={handleClick}>
						<span className="sr-only">Open main menu</span>
						<FontAwesomeIcon icon={faBars} className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<ul className="hidden md:flex md:gap-x-6 lg:gap-x-12">{children}</ul>
			</nav>
		</header>
	);
}

export function PrimaryOffCanvasMenu(): ReactElement<FC> {
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
					<Dialog.Panel className="fixed inset-0 z-10 w-full overflow-y-auto px-6 py-6 bg-neutral-800 text-neutral-400">
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
							</a>
							<button type="button" className="-m-2.5 rounded-md p-2.5 transition-colors ease-linear hover:text-neutral-200" onClick={handleClick}>
								<span className="sr-only">Close menu</span>
								<FontAwesomeIcon icon={faXmark} className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<ul className="space-y-2 py-6">
                                    <li
									    key="home"
										className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200">
										<a href="#">Home</a>
									</li>
                                    <li
									    key="about"
										className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200">
										<a href="#">About</a>
									</li>
                                    <li
									    key="skills"
										className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200">
										<a href="#">Skills</a>
									</li>
                                    <li
									    key="projects"
										className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200">
										<a href="#">Projects</a>
									</li>
                                    <li
									    key="contact"
										className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200">
										<a href="#">Contact</a>
									</li>
                                    <li
									    key="blog"
										className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200">
										<a href="#">Blog</a>
									</li>
								</ul>
							</div>
						</div>
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
}
