import { call, put } from 'redux-saga/effects';
import { Action } from '../actions';
import { loadcastdetails, loadShowDetails, searchShowsandCasts } from '../api';

import { castLoadedAction, showCastLoadedAction, ShowDetailLoadedAction, ShowsLoadedAction } from '../slices/shows';

export  function*  fetchShow(action:Action):Generator<any,any,any>{

  const {shows,casts}=  yield call(searchShowsandCasts, action.payload);
  yield put(castLoadedAction(casts));
  yield put(ShowsLoadedAction(shows));
}

export function* fetchShowDetail(action:Action):Generator<any,any,any>{
  const show = yield call(loadShowDetails,action.payload);
  // const casts = yield call(loadcastdetails,)
  yield put(ShowDetailLoadedAction(show));
}

export function* fetchCastDetail(action:Action):Generator<any,any,any>{
  const cast = yield call (loadcastdetails,action.payload);

  yield put(showCastLoadedAction({casts:cast,showid:action.payload}))
}