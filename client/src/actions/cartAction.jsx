import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, UPDATE_CART_ITEM, CLEAR_CART } from "@/constans/cartConstants";
import axiosInstance from "../utils/axiosConfig";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axiosInstance.get(`/api/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const updateCartItemQuantity = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axiosInstance.get(`/api/product/${id}`);

  dispatch({
    type: UPDATE_CART_ITEM,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });

  localStorage.removeItem("cartItems");
};
