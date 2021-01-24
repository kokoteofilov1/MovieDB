import React, { useEffect, useState } from 'react';
import { addArtist } from '../api';

function ArtistForm() {
	const formFieldsInitialState = {
		firstName: '',
		lastName: '',
		profession: '',
		birthDate: '',
	};

	const [formFields, setFormFields] = useState(formFieldsInitialState);

	useEffect(() => {}, []);

	const changeFormValues = (event) => {
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};

	const submitArtist = async (event) => {
		event.preventDefault();

		const body = JSON.stringify({ ...formFields });

		setFormFields(formFieldsInitialState);
		await addArtist(body);
	};

	return (
		<div class="mt-5 md:mt-0 md:col-span-2">
			<form action="#" method="POST" onSubmit={submitArtist}>
				<div class="shadow overflow-hidden sm:rounded-md">
					<div class="px-4 py-5 bg-white sm:p-6">
						<div class="grid grid-cols-6 gap-6">
							<div class="col-span-6 sm:col-span-3">
								<label
									for="firstName"
									class="block text-sm font-medium text-gray-700">
									First name
								</label>
								<input
									value={formFields.firstName}
									onChange={changeFormValues}
									type="text"
									name="firstName"
									autocomplete="given-name"
									class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>

							<div class="col-span-6 sm:col-span-3">
								<label
									for="lastName"
									class="block text-sm font-medium text-gray-700">
									Last name
								</label>
								<input
									value={formFields.lastName}
									onChange={changeFormValues}
									type="text"
									name="lastName"
									autocomplete="family-name"
									class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>

							<div class="col-span-6 sm:col-span-4">
								<label
									for="profession"
									class="block text-sm font-medium text-gray-700">
									Profession
								</label>
								<select
									value={formFields.profession}
									onChange={changeFormValues}
									name="profession"
									autocomplete="country"
									class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
									<option hidden>Select an Option</option>
									<option>Actor</option>
									<option>Producer</option>
									<option>Musician</option>
								</select>
							</div>

							<div class="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									for="birthDate"
									class="block text-sm font-medium text-gray-700">
									Birth date
								</label>
								<input
									value={formFields.birthDate}
									onChange={changeFormValues}
									type="date"
									name="birthDate"
									class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
					<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<button
							type="submit"
							class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ArtistForm;
