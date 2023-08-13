import { useState, useCallback } from 'react';
import { useBannerState } from '../state/banner';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons'
import type { ReactElement, FC, FormEvent, SyntheticEvent } from 'react';

export interface ContactFormProps {
	widthClass?: string;
}

interface IGenericError {
	code: string;
	expected: string;
	received: string;
	path: Array<string>;
	message: string;
}

interface IGenericResponse {
	code: number;
	type: string;
	errors?: Array<IGenericError>;
	error?: string;
	message?: string;
}

interface IFormField<ValueType> {
	value: ValueType;
	error : IGenericError | null;
}

interface IFormTextState {
	firstName: IFormField<string>;
	lastName: IFormField<string>;
	email: IFormField<string>;
	company: IFormField<string>;
	budget: IFormField<string>;
	message: IFormField<string>;
}

interface FormFieldProps {
	value: string;
	disabled: boolean;
	onChange: (e: SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	name: string;
	id: string;
	containerClassName?: string;
	error: IGenericError | null;
	labelValue: string | ReactElement<FC>;
}

type FormServiceDataType = IFormField<Array<string>>;

const initFormDataState: IFormTextState = {
	firstName: {
		value: '',
		error: null
	},
	lastName: {
		value: '',
		error: null
	},
	email: {
		value: '',
		error: null
	},
	company: {
		value: '',
		error: null
	},
	budget: {
		value: '$500 - $1,000',
		error: null
	},
	message: {
		value: '',
		error: null
	},
};

const initFormServicesData: FormServiceDataType = {value: [], error: null};

function FormFieldInput({value, onChange, disabled, name, id, labelValue, error, containerClassName = 'sm:col-span-2'}: FormFieldProps): ReactElement<FC> {
	const inputClasses: string = classNames('block w-full rounded-md border-0 px-3.5 py-2 bg-neutral-800 placeholder:text-neutral-400 shadow-sm ring-inset focus:ring-2 focus:ring-dark-red sm:text-sm sm:leading-6 disabled:bg-neutral-600', {
		'ring-1 ring-neutral-400': error == null,
		'ring-2 ring-amber-500': error != null
	});

	return (
		<div className={containerClassName}>
			<label htmlFor={id} className="block text-sm font-semibold leading-6">{labelValue}</label>
			<div className="mt-2.5">
				<input
					type="text"
					name={name}
					id={id}
					value={value}
					onChange={onChange}
					disabled={disabled}
					className={inputClasses} />
			</div>
			<div className="h-8 p-2">
				{error != null ? <p className="text-xs font-light text-amber-500 line-clamp-1">{error.message}</p> : null}
			</div>
		</div>
	);
}

export default function ContactForm({ widthClass }: ContactFormProps): ReactElement<FC> {
	const [setMessage, setType, setOpen, bannerType] = useBannerState((state) => [state.setMessage, state.setType, state.setOpen, state.type]);
	const [formData, setFormData] = useState<IFormTextState>(initFormDataState);
	const [formServicesData, setFormServicesData] = useState<FormServiceDataType>(initFormServicesData);
	const [processing, setProcessing] = useState<boolean>(false);
	const formContainerClasses: string = classNames('flex flex-col justify-center min-h-[calc(100vh_-_7rem)]', {
		'w-full': widthClass == null || widthClass?.length === 0,
		[widthClass as string]: widthClass != null && widthClass.length > 0
	});
	const budgetClasses: string = classNames('block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-inset bg-neutral-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6 disabled:bg-neutral-600', {
		'ring-1 ring-neutral-400': formData.budget.error == null,
		'ring-2 ring-amber-500': formData.budget.error != null
	});
	const messageClasses: string = classNames('block w-full resize-none overflow-y-auto overflow-x-hidden h-52 rounded-md border-0 px-3.5 py-2 shadow-sm ring-inset bg-neutral-800 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-red sm:text-sm sm:leading-6 disabled:bg-neutral-600', {
		'ring-1 ring-neutral-400': formData.message.error == null,
		'ring-2 ring-amber-500': formData.message.error != null
	});
	const handleTextChange = useCallback((e: SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
		const {currentTarget: {name, value}} = e;
		setFormData((state: IFormTextState): IFormTextState => ({...state, [name]: {...state[name as keyof IFormTextState], value: value}}));
	}, []);
	const handleServicesChange = useCallback((e: SyntheticEvent<HTMLInputElement>): void => {
		const {currentTarget: {checked, name}} = e;
		setFormServicesData((state: FormServiceDataType): FormServiceDataType => {
			if(!checked) return {...state, value: state.value.filter((elem: string): boolean => elem !== name)};

			return {...state, value: [...state.value, name]};
		});
	}, []);
	const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setProcessing(true);

		try {
			const response: Response = await fetch(`${window.location.origin}/api/contact`, {
				method: 'POST',
				body: JSON.stringify({
					firstName: formData.firstName.value,
					lastName: formData.lastName.value,
					email: formData.email.value,
					company: formData.company.value.length > 0 ? formData.company.value : null,
					budget: formData.budget.value,
					services: formServicesData.value,
					message: formData.message.value
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const json: IGenericResponse = await response.json();

			if(json.code === 200) {
				setMessage(json.message as string);
				setType('success');
				setOpen(true);
			}

			if(json.code === 500) {
				console.error(json.error);
				if(bannerType !== 'error') setType('error');
				setMessage(json.error as string);
				setOpen(true);
			}

			if(json.code === 400) {
				if(json.errors instanceof Array) {
					const formErrors: Array<IGenericError> = [...json.errors];

					setFormData((state: IFormTextState): IFormTextState => {
						let newState = {...state};

						for(let error of formErrors) {
							const errorField: string = error.path[0];

							if(errorField === 'services') continue;

							newState = {...newState, [errorField]: {...newState[errorField as keyof IFormTextState], error: error}};
						}

						return newState;
					});
					setFormServicesData((state: FormServiceDataType): FormServiceDataType => {
						const servicesError: IGenericError | undefined = formErrors.filter((item: IGenericError): boolean => item.path[0] === 'services')[0];

						if(servicesError != null) return {...state, error: servicesError};

						return state;
					});
				} else {
					console.error(json.error);
					if(bannerType !== 'error') setType('error');
					setMessage(json.error as string);
					setOpen(true);
				}
			} else {
				setFormData(initFormDataState);
				setFormServicesData(initFormServicesData);
			}

		} catch(err: any) {
			if(err != null) {
				console.error(err);
				if(bannerType !== 'error') setType('error');
				setMessage(err);
				setOpen(true);
			}
		}

		setProcessing(false);
	}, [formData, formServicesData, bannerType]);

	return (
		<div className={formContainerClasses}>
			<form onSubmit={handleSubmit} className="w-full px-8">
				<div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2 w-full">
					<FormFieldInput
						id="first-name"
						name="firstName"
						key="contact-field-1"
						labelValue="First Name"
						containerClassName="col-span-2 sm:col-span-1"
						value={formData.firstName.value}
						error={formData.firstName.error}
						onChange={handleTextChange}
						disabled={processing} />
					<FormFieldInput
						id="last-name"
						name="lastName"
						key="contact-field-2"
						labelValue="Last Name"
						containerClassName="col-span-2 sm:col-span-1"
						value={formData.lastName.value}
						error={formData.lastName.error}
						onChange={handleTextChange}
						disabled={processing} />
					<FormFieldInput
						id="email"
						name="email"
						key="contact-field-3"
						labelValue="Email"
						value={formData.email.value}
						error={formData.email.error}
						onChange={handleTextChange}
						disabled={processing} />
					<FormFieldInput
						id="company"
						name="company"
						key="contact-field-4"
						labelValue={(
							<>
								Company
								<span className="pl-1 text-xs text-neutral-500 italic">&#40;Optional&#41;</span>
							</>
						)}
						value={formData.company.value}
						error={formData.company.error}
						onChange={handleTextChange}
						disabled={processing} />
					<div className="col-span-2 md:col-span-1">
						<label htmlFor="budget" className="block text-sm font-semibold leading-6">
							Budget
						</label>
						<div className="mt-2">
							<select
								id="budget"
								name="budget"
								autoComplete="budget"
								value={formData.budget.value}
								onChange={handleTextChange}
								disabled={processing}
								className={budgetClasses}
							>
								<option key="budget-option-1">$500 - $1,000</option>
								<option key="budget-option-2">$1,000 - $2,000</option>
								<option key="budget-option-3">$2,000 - $5,000</option>
								<option key="budget-option-4">$5,000 - $10,000</option>
								<option key="budget-option-5">$10,000 +</option>
							</select>
						</div>
						<div className="h-8 p-2">
							{formData.budget.error != null ? <p className="text-xs font-light text-amber-500 line-clamp-1">{formData.budget.error.message}</p> : null}
						</div>
					</div>
					<div className="col-span-2 md:col-span-1">
						<legend className="block text-sm font-semibold leading-6">Services</legend>
                        <fieldset id="services" className="flex flex-row w-full flex-wrap gap-2 pt-2">
                                <div className="flex flex-col">
                                    <input
										id="web-development"
										name="web-development"
										type="checkbox"
										className="peer hidden"
										checked={formServicesData.value.includes('web-development')}
										disabled={processing}
										onChange={handleServicesChange} />
                                    <label
                                        htmlFor="web-development"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Web Development
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input
										id="web_design"
										name="web-design"
										type="checkbox"
										className="peer hidden"
										checked={formServicesData.value.includes('web-design')}
										disabled={processing}
										onChange={handleServicesChange} />
                                    <label
                                        htmlFor="web_design"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Web Design
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input
										id="sys_administration"
										name="sys-administration"
										type="checkbox"
										className="peer hidden"
										checked={formServicesData.value.includes('sys-administration')}
										disabled={processing}
										onChange={handleServicesChange} />
                                    <label
                                        htmlFor="sys_administration"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Systems Administration
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input
										id="network_administration"
										name="network-administration"
										type="checkbox"
										className="peer hidden"
										checked={formServicesData.value.includes('network-administration')}
										disabled={processing}
										onChange={handleServicesChange} />
                                    <label
                                        htmlFor="network_administration"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Network Administration
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <input
										id="something_else"
										name="something-else"
										type="checkbox"
										className="peer hidden"
										checked={formServicesData.value.includes('something-else')}
										disabled={processing}
										onChange={handleServicesChange} />
                                    <label
                                        htmlFor="something_else"
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-neutral-400 select-none cursor-pointer transition-colors duration-300 ease-in-out peer-hover:bg-dark-red peer-checked:bg-dark-red peer-checked:border-neutral-200">
                                            Something Else
                                    </label>
                                </div>
                        </fieldset>
						<div className="h-8 p-2">
							{formServicesData.error != null ? <p className="text-xs font-light text-amber-500 line-clamp-1">{formServicesData.error.message}</p> : null}
						</div>
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
								className={messageClasses}
								value={formData.message.value}
								onChange={handleTextChange}
								disabled={processing} />
						</div>
						<div className="h-8 p-2">
							{formData.message.error != null ? <p className="text-xs font-light text-amber-500 line-clamp-1">{formData.message.error.message}</p> : null}
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-center w-full mt-10 pr-8">
					<button
						type="submit"
						disabled={processing}
						className="block w-36 rounded-md bg-neutral-200 text-neutral-900 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm transition-colors duration-300 hover:bg-dark-red hover:text-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-red disabled:bg-dark-red  disabled:text-neutral-200 disabled:opacity-90"
					>
						{processing ? <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 text-neutral-200"  spinPulse /> : 'Send Message!'}
					</button>
				</div>
			</form>
		</div>
	);
}
