import { apiRequest } from './api';
import { GenreTypes } from './genresTypes';

// Fetch all free games from the API.
export async function fetchFreeGames() {
  return apiRequest<Game[]>('/games');
}

// Fetch a single free game by its ID from the API.
export async function fetchFreeGameById(id: Game['id']) {
  return apiRequest<GameVerbose>(`/game?id=${id}`);
}

// Fetch games by genre
export async function fetchGamesByGenre(genre: GenreTypes) {
    return apiRequest<Game[]>(`/games?category=${genre}`);
}

export type Game =  {
    id: number;
    title: string | null;
    thumbnail: string | null;
    short_description: string | null;
    game_url: string | null;
    genre: string | null;
    platform: string | null;
    publisher: string | null;
    developer: string | null;
    release_date: string | null;
    freetogame_profile_url: string | null;
}

export type GameVerbose = {
  id: number;
  title: string | null;
  thumbnail: string | null;
  status: string | null;
  short_description: string | null;
  description: string | null;
  game_url: string | null;
  genre: string | null;
  platform: string | null;
  publisher: string | null;
  developer: string | null;
  release_date: string | null;
  freetogame_profile_url: string | null;
  minimum_system_requirements: SystemRec | null;
  screenshots: Screenshot[] | null;
}

type SystemRec = {
    os: string | null;
    processor: string | null;
    memory: string | null;
    graphics: string | null;
    storage: string | null;
  }

type Screenshot = {
      id: number | null;
      image: string | null;
}