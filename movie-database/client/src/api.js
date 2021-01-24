import axios from 'axios';

export const terminateSession = () => {
	return axios.get('/api/SignOut').then((res) => console.log(res.data));
};

export const checkAuthentication = () => {
	return axios.get('/api/checkAuthentication');
};

export const checkAdmin = () => {
	return axios.get('/api/checkAdmin');
};

export const addCategory = (body) => {
	return axios.post('/api/addCategory', body, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const getCategories = () => {
	return axios.get('/api/getCategories');
};

export const addArtist = (body) => {
	return axios.post('/api/addArtist', body, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const getActors = () => {
	return axios.get('/api/getActors');
};

export const getProducers = () => {
	return axios.get('/api/getProducers');
};

export const addMovie = (body) => {
	return axios.post('/api/addMovie', body, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const getMovies = () => {
	return axios.get('/api/getMovies');
};

export const addUserReview = (body) => {
	return axios.post('/api/addUserReview', body, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const getUserReviews = () => {
	return axios.get('/api/getUserReviews');
};
