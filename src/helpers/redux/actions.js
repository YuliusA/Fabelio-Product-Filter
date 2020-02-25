import { SET_FURNITURE_DATA } from "./types";

export const furnitureDataAction = (text) => dispatch => {
    dispatch({
        type: SET_FURNITURE_DATA,
        data: text
    })
}