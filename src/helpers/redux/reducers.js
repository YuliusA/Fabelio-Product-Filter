import { SET_FURNITURE_DATA, SET_FURNITURE_LIST } from "./types";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_FURNITURE_DATA:            
            return {
                result: action.data
            }
        case SET_FURNITURE_LIST:
            return{
                result: action.data
            }
        default:
            return state
    }
}