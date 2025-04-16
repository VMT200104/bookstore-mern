import { ADD_TO_FAVORITE, REMOVE_FAVORITE_ITEM, FAVORITE_RESET } from "@/constans/favoriteConstants";
import axiosInstance from "../utils/axiosConfig";

export const addToFavorite = (id) => async (dispatch, getState) => {
  const { data } = await axiosInstance.get(`/api/product/${id}`);

  dispatch({
    type: ADD_TO_FAVORITE,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
    },
  });

  localStorage.setItem("favoriteItems", JSON.stringify(getState().favorite.favoriteItems));
};

export const removeFromFavorite = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FAVORITE_ITEM,
    payload: id,
  });

  localStorage.setItem("favoriteItems", JSON.stringify(getState().favorite.favoriteItems));
};

export const resetFavorite = () => async (dispatch) => {
  dispatch({
    type: FAVORITE_RESET,
  });

  localStorage.removeItem("favoriteItems");
}; 