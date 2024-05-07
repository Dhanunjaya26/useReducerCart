import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
  CLEAR_ITEMS,
  REMOVE,
  INCREASE,
  DECREASE_ITEM,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import { getTotals } from "./utils";

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

// const cartItemsMap = new Map(cartItems.map((item) => [item.id, item]));
// console.log(cartItemsMap);

// const backToArray = Array.from(cartItemsMap.entries());

const initialState = {
  isLoading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])), //backToArray
  //   array: backToArray,
};

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalItems, totalAmount } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_ITEMS });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
    // console.log(id);
  };

  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
    // console.log("inside increase dispatch function", id);
  };

  const decreaseItem = (id) => {
    dispatch({ type: DECREASE_ITEM, payload: { id } });
  };

  const loading = () => {};

  const displayItems = () => {};

  const fetchData = async () => {
    dispatch({ type: LOADING, payload: { loading: true } });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({type: DISPLAY_ITEMS, payload: {data}});
    dispatch({ type: LOADING, payload: { loading: false } });
    return data;
  };

  useEffect(() => {
    console.log(fetchData());
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        loading,
        displayItems,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
