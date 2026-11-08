import { apiRequest } from './api';
import { GenreTypes } from './genresTypes';

// Fetch all free games from the API.
export async function fetchFreeGames() {
  try {
    const games = await apiRequest<Game[]>('/games');

    return games
  } catch (error) {
    throw new Error('Could not load games')
  }
}

// Fetch a single free game by its ID from the API.
export async function fetchFreeGameById(id: Game['id']) {
  try {
    return await apiRequest<GameVerbose>(`/game?id=${id}`);
  } catch (error) {
    throw new Error('Could not load game')
  }
}

export async function fetchGamesByFilter({
  genre,
  platform,
  sort,
}: GameFilterOptions = {}) {
  const params = new URLSearchParams();

  if (genre) {
    params.set('category', genre);
  }

  if (platform) {
    params.set('platform', platform);
  }

  if (sort === Sorts.releaseDate) {
    params.set('sort-by', 'release-date');
  }

  const query = params.toString();
  const games = await apiRequest<Game[]>(query ? `/games?${query}` : '/games');

  if (sort === Sorts.alphabetically) {
    games.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
  }

  return games;
}

// Fetch games by search query, not available on API so has to conduct the query here.
export async function searchGame(query: string) {
  // Get all games (TO-DO: best to do this in the backend in the future, or cache this so we don't have to make such large queries with every search)
  const games = await fetchFreeGames()
  const res: Game[] = [];

  for (const game of games) {
    if (game.title?.includes(query)) {
      res.push(game);
    }
  }

  return res;

}

// Fetch games by genre and/or platform
export type GameFilterOptions = {
  genre?: GenreTypes;
  platform?: Platforms;
  sort?: Sorts;
};

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

export enum Platforms {
  windows = 'windows',
  browser = 'browser'
}

export enum Sorts {
  alphabetically = 'alphabetically',
  releaseDate = 'release-date'
}