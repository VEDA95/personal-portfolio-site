import { useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/pro-regular-svg-icons';
import useOffCanvasState from '../state/offCanvas';
import type { ReactElement, FC } from 'react';

const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' }
];

export function NavBar(): ReactElement<FC> {
	const setOffCanvas = useOffCanvasState((state) => state.setOffCanvas);
    const handleClick = useCallback(() => setOffCanvas(true), []);

	return (
		<header className="bg-transparent">
			<nav className="mx-2 md:mx-4 flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<a href="#" className="-m-1.5 p-1.5">
					<span className="sr-only">Your Company</span>
					<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
				</a>
				<div className="flex md:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
						onClick={handleClick}
					>
						<span className="sr-only">Open main menu</span>
						<FontAwesomeIcon icon={faBars} className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<ul className="hidden md:flex md:gap-x-6 lg:gap-x-12">
					{navigation.map((item) => (
                        <li key={item.name} className="text-sm font-semibold leading-6">
                            <a href={item.href}>{item.name}</a>
                        </li>
					))}
                    <li className="text-sm font-semibold leading-6">
                        <a href="#">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </li>
				</ul>
			</nav>
		</header>
	);
}

export function PrimaryOffCanvasMenu(): ReactElement<FC> {
    const [enabled, setOffCanvas] = useOffCanvasState((state) => [state.enabled, state.setOffCanvas]);
    const handleClick = useCallback(() => setOffCanvas(false), []);

	return (
		<Dialog as="div" className="md:hidden" open={enabled} onClose={setOffCanvas}>
			<div className="fixed inset-0 z-10" />
			<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
				<div className="flex items-center justify-between">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
					</a>
					<button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={handleClick}>
						<span className="sr-only">Close menu</span>
						<FontAwesomeIcon icon={faXmark} className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="mt-6 flow-root">
					<div className="-my-6 divide-y divide-gray-500/10">
						<ul className="space-y-2 py-6">
							{navigation.map((item) => (
                                <li key={item.name} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    <a href={item.href}>{item.name}</a>
                                </li>
							))}
						</ul>
						<div className="py-6">
							<a
								href="#"
								className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>
								Log in
							</a>
						</div>
					</div>
				</div>
			</Dialog.Panel>
		</Dialog>
	);
}
