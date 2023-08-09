import { useState, useCallback } from 'react';
import classNames from 'classnames';
import type { ReactElement, FC, FormEvent } from 'react';

export interface ContactFormProps {
	widthClass?: string;
}

export default function ContactForm({ widthClass }: ContactFormProps): ReactElement<FC> {
	const formContainerClasses: string = classNames('flex flex-col justify-center min-h-[calc(100vh_-_7rem)]', {
		'w-full': widthClass == null || widthClass?.length === 0,
		[widthClass as string]: widthClass != null && widthClass.length > 0
	});
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}, []);

	return (
		<div className={formContainerClasses}>
			<form onSubmit={handleSubmit} className="w-full px-8">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 w-full">
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="first-name" className="block text-sm font-semibold leading-6">
							First name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="first-name"
								id="first-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 bg-neutral-800 placeholder:text-neutral-400 shadow-sm ring-1 ring-inset ring-neutral-400 focus:ring-2 focus:ring-dark-red sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="last-name" className="block text-sm font-semibold leading-6">
							Last name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="last-name"
								id="last-name"
								autoComplete="family-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-neutral-800 ring-neutral-400 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="email" className="block text-sm font-semibold leading-6">
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-neutral-800 ring-neutral-400 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="company" className="block text-sm font-semibold leading-6">
							Company
							<span className="pl-2 text-sm italic text-neutral-400">(Optional)</span>
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="company"
								id="company"
								autoComplete="organization"
								className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-neutral-800 ring-neutral-400 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="col-span-2 md:col-span-1">
						<label htmlFor="budget" className="block text-sm font-semibold leading-6">
							Budget
						</label>
						<div className="mt-2">
							<select
								id="budget"
								name="budget"
								autoComplete="budget"
								className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-neutral-800 ring-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6"
							>
								<option>$500 - $1,000</option>
								<option>$1,000 - $2,000</option>
								<option>$2,000 - $5,000</option>
								<option>$5,000 - $10,000</option>
								<option>$10,000 +</option>
							</select>
						</div>
					</div>
					<div className="col-span-2 md:col-span-1">
						<legend className="block text-sm font-semibold leading-6">Services</legend>
                        <fieldset id="services" className="flex flex-row w-full flex-wrap gap-2 pt-2">
                                <div className="flex flex-col">
                                    <input id="web_development" name="services" type="checkbox" className="peer hidden"/>
                                    <label
                                        htmlFor="web_development"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Web Development
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input id="web_design" name="services" type="checkbox" className="peer hidden"/>
                                    <label
                                        htmlFor="web_design"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Web Design
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input id="sys_administration" name="services" type="checkbox" className="peer hidden"/>
                                    <label
                                        htmlFor="sys_administration"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Systems Administration
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input id="network_administration" name="services" type="checkbox" className="peer hidden"/>
                                    <label
                                        htmlFor="network_administration"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Network Administration
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input id="something_else" name="services" type="checkbox" className="peer hidden"/>
                                    <label
                                        htmlFor="something_else"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Something Else
                                    </label>
                                </div>
                        </fieldset>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="message" className="block text-sm font-semibold leading-6">
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								name="message"
								id="message"
								rows={4}
								className="block w-full resize-none overflow-y-auto overflow-x-hidden h-52 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-neutral-800 ring-neutral-400 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6"
								defaultValue={''}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-center w-full mt-10 pr-8">
					<button
						type="submit"
						className="block w-36 rounded-md bg-neutral-200 text-neutral-900 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm transition-colors duration-300 hover:bg-dark-red hover:text-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-red"
					>
						Send Message !
					</button>
				</div>
			</form>
		</div>
	);
}
