export type GamePlatform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'iOS' | 'Android';

export type GameStatus = 'playing' | 'backlog' | 'completed' | 'abandoned';

export interface IAchievementItem {
  id: number;
  gameId: number;
  name: string;
  description?: string;
  imageUrl?: string;
  percent?: string;
  earned: boolean;
  earnedAt?: string;
}

export interface IGame {
  id: string;
  title: string;
  platform: GamePlatform;
  status: GameStatus;
  playtime: number;
  rating: number;
  coverImage: string;
  genre: string;
  rawgId?: number;
  lastUpdated: string;
  achievements: IAchievementItem[];
  achievementsCompleted: number;
  achievementsTotal: number;
}

export interface IGamePayload {
  title: string;
  platform: GamePlatform;
  status: GameStatus;
  playtime?: number;
  rating?: number;
  cover_image?: string;
  genre?: string;
  rawg_id?: number;
}

export interface IRAWGSearchResult {
  rawg_id: number;
  title: string;
  cover_image?: string;
  genres?: string[];
  platforms?: string[];
}

export interface IAddGameModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  games: IGame[];
  setGames: React.Dispatch<React.SetStateAction<IGame[]>>;
  resetForm: () => void;
}

export interface IMiniStatProps {
  label: string;
  value: string | number;
  color?: string;
}