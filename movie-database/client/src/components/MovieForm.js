import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { getActors, getProducers, getCategories, addMovie } from '../api';

function MovieForm() {
	const formFieldsInitialState = {
		title: '',
		genre: '',
		producer: '',
		productionDate: '',
		language: '',
		rating: '',
		trailerURL: '',
		posterURL: '',
		country: '',
		ratingIMDB: '',
		description: '',
	};
	const [formFields, setFormFields] = useState(formFieldsInitialState);
	const characterDetailsInitialState = {
		character: '',
		playedBy: '',
	};
	const [characterDetails, setCharacterDetails] = useState(
		characterDetailsInitialState
	);
	const [availableActors, setAvailableActors] = useState([]);
	const [availableProducers, setAvailableProducers] = useState([]);
	const [availableCategories, setAvailableCategories] = useState([]);
	const [characters, setCharacters] = useState([]);
	const [selectedActors, setSelectedActors] = useState([]);
	const [selectedAwards, setSelectedAwards] = useState([]);

	useEffect(() => {
		const fetchActors = async () => {
			const result = await getActors();
			setAvailableActors(result.data);
		};

		const fetchProducers = async () => {
			const result = await getProducers();
			setAvailableProducers(result.data);
		};

		const fetchCategories = async () => {
			const result = await getCategories();
			setAvailableCategories(result.data.categories);
		};

		fetchActors();
		fetchProducers();
		fetchCategories();
	}, []);

	const actorOptions = availableActors.map((actor) => ({
		value: actor.firstName + ' ' + actor.lastName,
		label: actor.firstName + ' ' + actor.lastName,
	}));

	const awardsOptions = [
		{ value: 'Academy Award', label: 'Academy Award' },
		{ value: 'Golden Globe', label: 'Golden Globe' },
		{ value: 'Emmy Award', label: 'Emmy Award' },
		{ value: 'Grammy Award', label: 'Grammy Award' },
		{ value: 'American Music Award', label: 'American Music Award' },
		{
			value: 'Blockbuster Entertainment Awards',
			label: 'Blockbuster Entertainment Awards',
		},
		{ value: 'Blue Ribbon Award', label: 'Blue Ribbon Award' },
		{ value: 'Empire Award', label: 'Empire Award' },
		{ value: 'Golden Rooster Award', label: 'Golden Rooster Award' },
		{ value: 'Golden Screen Award', label: 'Golden Screen Award' },
	];

	const changeFormValues = (event) => {
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};

	const changeCharacterFormValues = (event) => {
		setCharacterDetails({
			...characterDetails,
			[event.target.name]: event.target.value,
		});
	};

	const handleActorsChange = (event) => {
		setSelectedActors(Array.isArray(event) ? event.map((x) => x.value) : []);
	};

	const handleAwardsChange = (event) => {
		setSelectedAwards(Array.isArray(event) ? event.map((x) => x.value) : []);
	};

	const addCharacter = (event) => {
		event.preventDefault();
		setCharacters([...characters, {character: characterDetails.character, playedBy: characterDetails.playedBy}]);

		console.log(characters);
		setCharacterDetails(characterDetailsInitialState);
	};

	const displayAvailableProducers =
		availableProducers.length > 0 &&
		availableProducers.map((producer) => {
			return <option>{producer.firstName + ' ' + producer.lastName}</option>;
		});
	const displayAvailableCategories =
		availableCategories.length > 0 &&
		availableCategories.map((category) => {
			return <option>{category.genre}</option>;
		});

	const displaySelectedActors = selectedActors.map((actor) => {
		return <option>{actor}</option>;
	});

	const submitMovie = async (event) => {
		event.preventDefault();

		const body = JSON.stringify({
			...formFields,
			actors: selectedActors,
			awards: selectedAwards,
			characters: characters,
		});

		console.log(characters);

		setFormFields(formFieldsInitialState);
		await addMovie(body);
	};

	const [value, setValue] = useState([]);
	const [inputValue, setInputValue] = useState([]);

	const components = {
		DropdownIndicator: null,
	};

	const createOption = (label) => ({
		label,
		value: label,
	});

	const handleChange = (value, actionMeta) => {
		console.group('Value Changed');
		console.log(value);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();
		setValue(value);
	};
	const handleInputChange = (inputValue) => {
		setInputValue(inputValue);
	};
	const handleKeyDown = (event) => {
		if (!inputValue) return;
		switch (event.key) {
			case 'Enter':
			case 'Tab':
				setInputValue('');
				setValue([...value, createOption(inputValue)]);
				event.preventDefault();
		}
	};

	return (
		<div class="mt-10 sm:mt-0">
			<div class="mt-5 md:mt-0 md:col-span-2">
				<form action="#" method="POST" onSubmit={submitMovie}>
					<div class="shadow overflow-hidden sm:rounded-md">
						<div class="px-4 py-5 bg-white sm:p-6">
							<div class="grid grid-cols-6 gap-6">
								<div class="col-span-6 sm:col-span-3">
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
										id="title"
										autocomplete="given-name"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label
										for="genre"
										class="block text-sm font-medium text-gray-700">
										Choose a category
									</label>
									<select
										value={formFields.genre}
										onChange={changeFormValues}
										id="genre"
										name="genre"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
										<option hidden>Select genre:</option>
										{displayAvailableCategories}
									</select>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label
										for="actors"
										class="block text-sm font-medium text-gray-700">
										Select actors for the movie:
									</label>
									<Select
										onChange={handleActorsChange}
										name="actors"
										options={actorOptions}
										isMulti
									/>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label
										for="awards"
										class="block text-sm font-medium text-gray-700">
										Select awards for the movie:
									</label>
									<Select
										onChange={handleAwardsChange}
										name="awards"
										options={awardsOptions}
										isMulti
									/>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label
										for="producer"
										class="block text-sm font-medium text-gray-700">
										Choose a producer
									</label>
									<select
										value={formFields.producer}
										onChange={changeFormValues}
										id="producer"
										name="producer"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
										<option hidden>Select a producer:</option>
										{displayAvailableProducers}
									</select>
								</div>

								<div class="col-span-3">
									<label
										for="productionDate"
										class="block text-sm font-medium text-gray-700">
										Production Date
									</label>
									<input
										value={formFields.productionDate}
										onChange={changeFormValues}
										type="date"
										name="productionDate"
										id="productionDate"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-2">
									<label
										for="language"
										class="block text-sm font-medium text-gray-700">
										Language
									</label>
									<input
										value={formFields.language}
										onChange={changeFormValues}
										type="text"
										name="language"
										id="language"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-2">
									<label
										for="rating"
										class="block text-sm font-medium text-gray-700">
										Rating
									</label>
									<input
										value={formFields.rating}
										onChange={changeFormValues}
										type="number"
										name="rating"
										id="rating"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-2">
									<label
										for="posterURL"
										class="block text-sm font-medium text-gray-700">
										Poster URL
									</label>
									<input
										value={formFields.posterURL}
										onChange={changeFormValues}
										type="text"
										name="posterURL"
										id="posterURL"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-2">
									<label
										for="trailerURL"
										class="block text-sm font-medium text-gray-700">
										Trailer URL
									</label>
									<input
										value={formFields.trailerURL}
										onChange={changeFormValues}
										type="text"
										name="trailerURL"
										id="trailerURL"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-2">
									<label
										for="country"
										class="block text-sm font-medium text-gray-700">
										Country
									</label>
									<input
										value={formFields.country}
										onChange={changeFormValues}
										type="text"
										name="country"
										id="country"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-2">
									<label
										for="ratingIMDB"
										class="block text-sm font-medium text-gray-700">
										IMDB Rating
									</label>
									<input
										value={formFields.ratingIMDB}
										onChange={changeFormValues}
										type="number"
										name="ratingIMDB"
										id="ratingIMDB"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6">
									<label
										for="description"
										class="block text-sm font-medium text-gray-700">
										Description
									</label>
									<textarea
										value={formFields.description}
										onChange={changeFormValues}
										type="text"
										name="description"
										id="description"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-6 lg:col-span-2">
									<label
										for="character"
										class="block text-sm font-medium text-gray-700">
										Character
									</label>
									<input
										value={formFields.character}
										value={characterDetails.character}
										onChange={changeCharacterFormValues}
										type="text"
										name="character"
										id="character"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>

								<div class="col-span-6 sm:col-span-6 lg:col-span-2">
									<label
										for="playedBy"
										class="block text-sm font-medium text-gray-700">
										Choose actor
									</label>
									<select
										value={characterDetails.playedBy}
										onChange={changeCharacterFormValues}
										id="playedBy"
										name="playedBy"
										class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
										<option hidden>Played By</option>
										{displaySelectedActors}
									</select>
								</div>

								<div class="col-span-6 sm:col-span-6 lg:col-span-2">
									<label
										for="addCharacter"
										class="block text-sm font-medium text-gray-700">
										Add character
									</label>
									<button
										onClick={addCharacter}
										name="addCharacter"
										id="addCharacter"
										class="mt-1 block w-full py-2 px-3 border text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
										Add Character
									</button>
								</div>

								<div class="col-span-6">
									<label
										for="addCharacter"
										class="block text-sm font-medium text-gray-700">
										Keywords
									</label>
									<CreatableSelect
										components={components}
										inputValue={inputValue}
										isClearable
										isMulti
										menuIsOpen={false}
										onChange={handleChange}
										onInputChange={handleInputChange}
										onKeyDown={handleKeyDown}
										placeholder="Type something and press enter..."
										value={value}
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

export default MovieForm;
