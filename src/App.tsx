import React, { Fragment, useEffect, useState } from 'react';
import { Store } from './stores/Store';
import { IAction, IEpisode, IState } from './interfaces/interfaces';
function App(): JSX.Element {
	const { state, dispatch } = React.useContext(Store);

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

	const toggleFavAction = (episode: IEpisode): IAction => {
		console.log(state);

		const episodeInFav = state.favorites.includes(episode);
		let dispatchObj = {
			type: 'ADD_FAV',
			payload: episode
		};

		if (episodeInFav) {
			const favWithoutEpisode = state.favorites.filter((fav: IEpisode) => fav.id !== episode.id);
			dispatchObj = {
				type: 'REMOVE_FAV',
				payload: favWithoutEpisode
			};
		}

		return dispatch(dispatchObj);
	};

	console.log(state);
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
									{state.favorites.find((fav: IEpisode) => fav.id === episode.id) ? 'Unfav' : 'Fav'}
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
