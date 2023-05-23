import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, DELETE_SELECTED_USER, DELETE_SELECTED_USER_MAINCHECKBOX } from "../action/action-api";

export const initailState: {
    loding: Boolean,
    data: [],
    error: String | null
    totalPage: number

} = {
    loding: false,
    data: [],
    error: null,
    totalPage: 0
};

const reducer =  (state = initailState, action: any) => {
    switch(action.type) {
        case FETCH_DATA_REQUEST:
            return {
              ...state,
                loding: true
            };
        case FETCH_DATA_SUCCESS:
            return {
              ...state,
                loding: false,
                data: action.payload,
                totalPage: Math.ceil(state.data.length / 10) 
            };
        case FETCH_DATA_FAILURE:
            return {
              ...state,
                loding: false,
                error: action.payload
            };
        case DELETE_SELECTED_USER:
            const updatedData =  state.data.filter((item: any) => item.id !== action.payload);
                return {
                  ...state,
                    loding: false,
                    data: updatedData
                };
        case DELETE_SELECTED_USER_MAINCHECKBOX:
            const index =  state.data.findIndex((item: any) => item.id !== action.payload)
            state.data.splice(index,1)
                        return {
                          ...state,
                            loding: false,
                            data: state.data
                        };
        default:
            return state;
    }
}

export default reducer;