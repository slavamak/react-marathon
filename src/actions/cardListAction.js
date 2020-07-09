import { FETCH_CARD_LIST, FETCH_CARD_LIST_RESOLVE, FETCH_CARD_LIST_REJECT } from "./actionTypes";

export const fetchCardList = (getData) => {
  return (dispatch, getState) => {
    dispatch(cardListAction());
    getData().on('value', res => {
      dispatch(cardListResolveAction(res.val()));
    });
  }
}

export const cardListAction = () => ({
  type: FETCH_CARD_LIST
});

export const cardListResolveAction = (payload) => ({
  type: FETCH_CARD_LIST_RESOLVE,
  payload
});

export const cardListRejectAction = (error) => ({
  type: FETCH_CARD_LIST_REJECT,
  error
});

