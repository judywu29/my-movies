import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(forbiddenWordsMiddleware)));
export default store;