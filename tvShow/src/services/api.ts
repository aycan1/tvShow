import axios from "axios"

export interface TVShow {
	id: number
	name: string
	url: string
	genres: string[]
	language: string
	rating: {
		average: number | null
	}
	image: {
		medium: string
		original: string
	} | null
	summary: string
	status: string
	runtime: number | null
	premiered: string
	ended: string | null
	schedule: {
		time: string
		days: string[]
	}
}

export interface TVShowData {
	score: number
	show: TVShow
}

export interface Episode {
	id: number
	name: string
	season: number
	number: number
	airdate: string
	airtime: string
	summary: string
	image: {
		medium: string
		original: string
	} | null
}

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

export const searchShows = async (query: string): Promise<TVShowData[]> => {
	const response = await apiClient.get(`/search/shows?q=${query}`)
	return response.data
}

export const getShowDetails = async (id: number): Promise<TVShow> => {
	const response = await apiClient.get(`/shows/${id}`)
	return response.data
}

export const getShowEpisodes = async (id: number): Promise<Episode[]> => {
	const response = await apiClient.get(`/shows/${id}/episodes`)
	return response.data
}

export async function getPopularShows(): Promise<TVShowData[]> {
	const response = await axios.get('https://api.tvmaze.com/shows');
	return response.data
		.sort((a, b) => b.rating.average - a.rating.average)
		.slice(0, 20)
		.map(show => ({ show }));
}
