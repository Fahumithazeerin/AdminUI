import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import ReducerApi from "../reducer/reducer-api";

const store = createStore(ReducerApi, applyMiddleware(thunk));

export default store;