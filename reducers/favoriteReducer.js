export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'ADD_FAVORITE': {
			return Object.assign({}, state, {
				favorites: action.payload
			})
	}
		case 'REMOVE_FAVORITE': {
			let favorites = state.favorites;
			favorites = favorites.slice(0, action.payload).concat(favorites.slice(action.payload+1))

			return Object.assign({}, state, {
				favorites: favorites
			})
		}
	default:
		return state
	}
}

// export default function reducer(state = {}, action) {
// 	switch (action.type) {
// 	case 'ADD_PLAYERS_TO_ROUND':
// 		return Object.assign({}, state, {
// 			amPlayers: action.payload.amPlayers,
// 			proPlayers: action.payload.proPlayers,
// 			cards: action.payload.cards
// 		})
// 	default:
// 		return state
// 	}
// }
