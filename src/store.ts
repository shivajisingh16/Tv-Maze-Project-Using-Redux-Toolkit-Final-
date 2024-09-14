
import createSagaMiddleware from 'redux-saga';
import { debounce, takeEvery, takeLeading } from "redux-saga/effects";
import { fetchCastDetail, fetchShow, fetchShowDetail } from "./sagas/Shows";
// import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import showsReducer, { loadCastAction, loadShowAction, ShowsQueryChangeAction } from "./slices/shows";

// const reducer = combineReducers({
//   shows:ShowReducer,
// });


function* rootSaga() {
  yield debounce(300,ShowsQueryChangeAction, fetchShow);
  yield takeEvery(loadShowAction,fetchShowDetail);
  yield takeLeading(loadCastAction,fetchCastDetail);
};

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer:{
    shows:showsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;

export default store;