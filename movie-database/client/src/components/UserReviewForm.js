import React, { useState } from 'react';
import { addUserReview } from '../api';

function UserReviewForm() {
	const formFieldsInitialState = {
		title: '',
		rating: '',
		description: '',
	};
	const [formFields, setFormFields] = useState(formFieldsInitialState);

	const changeFormValues = (event) => {
		if (event.target.name === 'rating') {
			if (event.target.value > 10) {
				setFormFields({
					...formFields,
					rating: 10,
				});
			} else if (event.target.value < 1) {
				setFormFields({
					...formFields,
					rating: '',
				});
			} else {
				setFormFields({
					...formFields,
					rating: event.target.value,
				});
			}
		} else {
			setFormFields({
				...formFields,
				[event.target.name]: event.target.value,
			});
		}
	};

	const submitUserReview = async () => {
		const body = JSON.stringify({ ...formFields });

		setFormFields(formFieldsInitialState);
		await addUserReview(body);
	};

	return (
		<div class="flex justify-center my-6">
			<div class="mt-5 md:mt-0 md:col-span-2">
				<form action="#" /* method="POST" */ onSubmit={submitUserReview}>
					<div class="shadow overflow-hidden sm:rounded-md">
						<div class="px-4 py-5 bg-white sm:p-6">
							<div class="grid grid-cols-6 gap-6">
								<div class="col-span-6">
									<label
										for="title"
										class="block text-sm font-medium text-gray-700">
										Title
									</label>
									<input
										value={formFields.title}
										onChange={changeFormValues}
										type="text"
										name="title"
										autoComplete="title"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label
										for="rating"
										class="block text-sm font-medium text-gray-700">
										How would you rate this movie 1-10?
									</label>
									<input
										value={formFields.rating}
										onChange={changeFormValues}
										type="number"
										name="rating"
										autoComplete="rating"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6">
									<label
										for="description"
										class="block text-sm font-medium text-gray-700">
										Your thoughts:
									</label>
									<textarea
										value={formFields.description}
										onChange={changeFormValues}
										type="text"
										name="description"
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
		</div>
	);
}

export default UserReviewForm;
