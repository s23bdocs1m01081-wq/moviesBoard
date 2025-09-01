import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BEARER = import.meta.env.VITE_TMDB_BEARER;
const BASE = 'https://api.themoviedb.org/3';

const defaultHeaders = {};
if (BEARER) {
	defaultHeaders['Authorization'] = BEARER.startsWith('Bearer ') ? BEARER : `Bearer ${BEARER}`;
}

const client = axios.create({
	baseURL: BASE,
	headers: defaultHeaders,
	params: {
		...(API_KEY ? { api_key: API_KEY } : {})
	}
});

export async function getMovieDetails(id, opts = {}) {
	const append = opts.append_to_response || 'videos,credits';
	try {
		const res = await client.get(`/movie/${id}`, { params: { append_to_response: append } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function getTVDetails(id, opts = {}) {
	const append = opts.append_to_response || 'videos,credits';
	try {
		const res = await client.get(`/tv/${id}`, { params: { append_to_response: append } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function searchMovies(query, page = 1) {
	try {
		const res = await client.get('/search/movie', { params: { query, page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function searchTV(query, page = 1) {
	try {
		const res = await client.get('/search/tv', { params: { query, page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function discoverTV(params = {}, page = 1) {
	try {
		const res = await client.get('/discover/tv', { params: { ...params, page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function discoverMovies(params = {}, page = 1) {
	try {
		const res = await client.get('/discover/movie', { params: { ...params, page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function getTVGenres() {
	try {
		const res = await client.get('/genre/tv/list');
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function getSimilarMovies(movieId, page = 1) {
	try {
		const res = await client.get(`/movie/${movieId}/similar`, { params: { page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function getMovieRecommendations(movieId, page = 1) {
	try {
		const res = await client.get(`/movie/${movieId}/recommendations`, { params: { page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function getSimilarTV(tvId, page = 1) {
	try {
		const res = await client.get(`/tv/${tvId}/similar`, { params: { page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function getTVRecommendations(tvId, page = 1) {
	try {
		const res = await client.get(`/tv/${tvId}/recommendations`, { params: { page } });
		return res.data;
	} catch (err) {
		throw err;
	}
}

export default { 
	getMovieDetails, 
	getTVDetails,
	searchMovies, 
	searchTV, 
	discoverTV, 
	discoverMovies, 
	getTVGenres, 
	getSimilarMovies, 
	getMovieRecommendations, 
	getSimilarTV, 
	getTVRecommendations 
};
