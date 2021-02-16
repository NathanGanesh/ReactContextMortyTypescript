import React, { useReducer } from 'react';
import { IAction, IState } from '../interfaces/interfaces';

const initialState: IState = {
	episodes: [],
	favorites: []
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
	console.log(action.payload);
	switch (action.type) {
		case 'FETCH_DATA':
			return { ...state, episodes: action.payload };
		case 'ADD_FAV':
			return { ...state, favorites: [ ...state.favorites, action.payload ] };
		case 'REMOVE_FAV':
			return { ...state, favorites: [ action.payload ] };

		default:
			return state;
	}
}

export function StoreProvider(props: any): JSX.Element {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>;
}
