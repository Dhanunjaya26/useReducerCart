import {
  CLEAR_ITEMS,
  REMOVE,
  INCREASE,
  DECREASE_ITEM,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_ITEMS) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const id = action.payload.id;
    newCart.set(id, { ...newCart.get(id), amount: newCart.get(id).amount + 1 });
    // console.log(newCart.get(id));
    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE_ITEM) {
    const newCart = new Map(state.cart);
    const id = action.payload.id;
    if (newCart.get(id).amount === 1) {
      newCart.delete(id);
      return { ...state, cart: newCart };
    }
    newCart.set(id, { ...newCart.get(id), amount: newCart.get(id).amount - 1 });
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, isLoading: action.payload.loading };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.data.map(item => [item.id, item]));
    return { ...state, cart: newCart };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
