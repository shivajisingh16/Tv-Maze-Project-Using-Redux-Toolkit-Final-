import { call, put } from 'redux-saga/effects';
import { Action } from '../actions';
import { loadcastdetails, loadShowDetails, searchShowsandCasts } from '../api';
import { castLoadedAction, showCastLoadedAction, ShowDetailLoadedAction, ShowsLoadedAction } from '../actions/Shows';

export  function*  fetchShow(action:Action):Generator<any,any,any>{
  const {shows,casts}=  yield call(searchShowsandCasts, action.payload);
  yield put(castLoadedAction(casts));
  yield put(ShowsLoadedAction(shows));
}

export function* fetchShowDetail(action:Action):Generator{
  const show = yield call(loadShowDetails,action.payload);
  // const casts = yield call(loadcastdetails,)
  yield put(ShowDetailLoadedAction(show));
}

export function* fetchCastDetail(action:Action):Generator{
  const cast = yield call (loadcastdetails,action.payload);
  console.log("saga pahunha")
  console.log(cast);
  yield put(showCastLoadedAction(action.payload,cast))
}