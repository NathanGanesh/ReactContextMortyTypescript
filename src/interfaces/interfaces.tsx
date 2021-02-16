export type Dispatch = React.Dispatch<IAction>;
export interface IAction {
	type: string;
	payload: Array<IEpisode>;
}
export interface IEpisode {
	id: number;
	url: string;
	name: string;
	season: number;
	number: number;
	airdate: string;
	airtime: string;
	airstamp: string;
	runtime: number;
	image: { medium: string; original: string };
	summary: string;
}

export interface IEpisodeProps {
	episodes: Array<IEpisode>;
	store: { state: IState; dispatch: Dispatch };
	toggleFavAction: (state: IState, dispatch: Dispatch, episode: IEpisode) => void;
	favorites: Array<IEpisode>;
}

export interface IState {
	episodes: Array<IEpisode>;
	favorites: Array<any>;
}
