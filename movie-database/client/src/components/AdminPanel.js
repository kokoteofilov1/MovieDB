import React, { useState, useEffect } from 'react';

import ArtistForm from './ArtistForm';
import CategoryForm from './CategoryForm';
import MovieForm from './MovieForm';
import Navigation from './Navigation';

function AdminPanel() {
	const [form, setFormType] = useState(<MovieForm />);

	useEffect(() => {}, [form]);

	return (
		<div>
			<Navigation />

			<div class="flex justify-center my-4">
				<button
					onClick={() => setFormType(<CategoryForm />)}
					class="inline-flex items-center justify-center mx-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
					Add Category
				</button>

				<button
					onClick={() => setFormType(<MovieForm />)}
					class="inline-flex items-center justify-center mx-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
					Add Movie
				</button>

				<button
					onClick={() => setFormType(<ArtistForm />)}
					class="inline-flex items-center justify-center mx-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
					Add Artist
				</button>
			</div>
			<div class="flex justify-center">{form}</div>
		</div>
	);
}

export default AdminPanel;
