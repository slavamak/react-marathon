import { FETCH_CARD_LIST, FETCH_CARD_LIST_REJECT, FETCH_CARD_LIST_RESOLVE } from "../actions/actionTypes";

const cardListReducer = (state, action) => {
  switch(action.type) {
    case FETCH_CARD_LIST:
      return {
        payload: [],
        error: null,
        isBusy: true
      }
    case FETCH_CARD_LIST_RESOLVE:
      return {
        payload: action.payload,
        error: null,
        isBusy: false
      }
    case FETCH_CARD_LIST_REJECT:
      return {
        payload: null,
        error: action.error,
        isBusy: false
      }
    default:
      return {
        payload: null,
        error: null,
        isBusy: false
      }
  }
}

export default cardListReducer;