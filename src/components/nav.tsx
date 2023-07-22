import { Fragment, useCallback, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/pro-regular-svg-icons';
import useOffCanvasState from '../state/offCanvas';
import type { ReactElement, FC } from 'react';

interface IPage {
    name: string;
    href: string;
}

export interface NavBarProps {
    layout?: 'base' | 'blog';
}

export function NavBar({layout = 'base'}: NavBarProps): ReactElement<FC> {
	const setOffCanvas = useOffCanvasState((state) => state.setOffCanvas);
	const handleClick = useCallback(() => setOffCanvas(true), []);
    const pages: Array<IPage> = useMemo(() => {
        switch(layout) {
            case 'base':
                return [
                    { name: 'Product', href: '#' },
                    { name: 'Features', href: '#' },
                    { name: 'Marketplace', href: '#' },
                    { name: 'Company', href: '#' }
                ];
            case 'blog':
                return [
                    { name: 'Product', href: '#' },
                    { name: 'Features', href: '#' },
                    { name: 'Marketplace', href: '#' },
                    { name: 'Company', href: '#' }
                ];
        }
    }, [layout]);

	return (
		<header className="bg-transparent">
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
				<ul className="hidden md:flex md:gap-x-6 lg:gap-x-12">
					{pages.map((item) => (
						<li key={item.name} className="text-sm font-semibold leading-6">
							<a href={item.href}>{item.name}</a>
						</li>
					))}
                    {layout === 'blog' ? (
                        <li className="text-sm font-semibold leading-6">
						    <a href="/">
							    Return to Site <span aria-hidden="true">&rarr;</span>
						    </a>
					    </li>
                    ) : null}
				</ul>
			</nav>
		</header>
	);
}

export function PrimaryOffCanvasMenu(): ReactElement<FC> {
	const [enabled, setOffCanvas] = useOffCanvasState((state) => [state.enabled, state.setOffCanvas]);
	const handleClick = useCallback(() => setOffCanvas(false), []);
    const pages: Array<IPage> = useMemo(() => ([
        { name: 'Product', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Marketplace', href: '#' },
        { name: 'Company', href: '#' }
    ]), []);

	return (
		<Transition.Root show={enabled} as={Fragment}>
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
									{pages.map((item) => (
										<li
											key={item.name}
											className="-mx-3 block transition-colors ease-linear rounded-lg px-3 py-2 text-2xl text-center font-bold leading-7 hover:text-neutral-200"
										>
											<a href={item.href}>{item.name}</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
}
