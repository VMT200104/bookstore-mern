import { ADD_TO_FAVORITE, REMOVE_FAVORITE_ITEM, FAVORITE_RESET } from "@/constans/favoriteConstants";

export const favoriteReducer = (state = { favoriteItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      const item = action.payload;
      const isItemExist = state.favoriteItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          favoriteItems: state.favoriteItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          favoriteItems: [...state.favoriteItems, item],
        };
      }

    case REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    case FAVORITE_RESET:
      return {
        ...state,
        favoriteItems: [],
      };

    default:
      return state;
  }
}; 