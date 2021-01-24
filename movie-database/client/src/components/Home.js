import React, { useState, useEffect, useContext } from 'react';

import Navigation from './Navigation';

import { getMovies } from '../api';
import UserReviewForm from './UserReviewForm';

function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			const result = await getMovies();
			setMovies(result.data);
		};

		fetchMovies();
	}, []);

	return (
		<div>
			<Navigation />
			<UserReviewForm />
		</div>
	);
}

export default Home;
