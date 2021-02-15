import React, { Fragment, useEffect, useState } from 'react';
import { Store, IAction } from './stores/Store';

function App(): JSX.Element {
	const { state, dispatch } = React.useContext(Store);
	interface IEpisode {
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
	useEffect(() => {
		state.episodes.length === 0 && fetchDataAction();
	}, []);

	const fetchDataAction = async () => {
		const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
		const data = await fetch(URL);
		const dataJSON = await data.json();
		return dispatch({
			type: 'FETCH_DATA',
			payload: dataJSON._embedded.episodes
		});
	};

	const toggleFavAction = (episode: IEpisode): IAction =>
		dispatch({
			type: 'ADD_FAV',
			payload: episode
		});

	return (
		<Fragment>
			<header className="header">
				<h1>Rick and morty</h1>
				<p>Pick your favourite episode!!!</p>
			</header>
			<section className="episode-layout">
				{state.episodes.map((episode: IEpisode) => {
					return (
						<section key={episode.id} className="episode-box">
							<img src={episode.image.medium} alt={`Rick and Mort ${episode.name}`} />
							<div>{episode.name}</div>
							<section>
								<div>
									Season:{episode.season} Number:{episode.number}
								</div>
								<button type="button" onClick={() => toggleFavAction(episode)}>
									Fav
								</button>
							</section>
						</section>
					);
				})}
			</section>
		</Fragment>
	);
}

export default App;
