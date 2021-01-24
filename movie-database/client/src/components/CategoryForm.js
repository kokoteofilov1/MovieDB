import React, { useEffect, useState } from 'react';
import { addCategory, getCategories } from '../api';

function CategoryForm() {
	const formFieldInitialState = {
		genre: '',
	};

	const [formField, setFormField] = useState(formFieldInitialState);
	const [categories, setCategories] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			const result = await getCategories();
			setCategories(result);
		};

		fetchCategories();
	}, []);

	const changeFormValue = (event) => {
		setFormField({
			genre: event.target.value,
		});
	};

	const submitCategory = async (event) => {
		event.preventDefault();

		const body = JSON.stringify({ genre: formField.genre });

		setFormField(formFieldInitialState);

		await addCategory(body);
	};

	return (
		<div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<form action="#" method="POST" onSubmit={submitCategory}>
					<div class="shadow overflow-hidden sm:rounded-md">
						<div class="px-4 py-5 bg-white sm:p-6">
							<div class="col-span-6 sm:col-span-3">
								<label
									for="genre"
									class="block text-sm font-medium text-gray-700">
									Category Name
								</label>
								<input
									value={formField.genre}
									onChange={changeFormValue}
									type="text"
									name="genre"
									autocomplete="genre"
									class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
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

export default CategoryForm;
