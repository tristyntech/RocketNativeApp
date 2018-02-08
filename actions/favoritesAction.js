module.exports.addFavorite = favorite => {
  return (dispatch) => {
    dispatch(createFavorite(favorite))
  }
}
module.exports.deleteFavorite = index => {
  return (dispatch) => {
    dispatch(remove(index))
  }
}

const remove = function(payload) {
  return{
    type: 'REMOVE_FAVORITE',
    payload: payload.index
  }
}
const createFavorite = function(payload) {
  return{
    type: 'ADD_FAVORITE',
    payload: payload.favorites
  }
}
