import { applyMiddleware, combineReducers, createStore } from "redux";
import ShowReducer from "./reducers/Shows";
import createSagaMiddleware from 'redux-saga';
import { debounce, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { LOAD_CAST_ACTION, LOAD_SHOW_ACTION, loadCastAction, loadShowAction, SHOWS_QUERY_CHANGE } from "./actions/Shows";
import { fetchCastDetail, fetchShow, fetchShowDetail } from "./sagas/Shows";
import { composeWithDevTools } from "@redux-devtools/extension";

const reducer = combineReducers({
  shows:ShowReducer,
});

function* rootSaga() {
  yield debounce(300,SHOWS_QUERY_CHANGE, fetchShow);
  yield takeEvery(LOAD_SHOW_ACTION,fetchShowDetail);
  yield takeLeading(LOAD_CAST_ACTION,fetchCastDetail);
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof reducer>;

export default store;