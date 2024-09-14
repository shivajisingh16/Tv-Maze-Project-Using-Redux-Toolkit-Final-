import { State } from "../store";
import { createSelector } from 'reselect';

export const showsStateSelector = (state:State) => state.shows;

export const showsQuerySelector = createSelector(showsStateSelector, (showState) => showState.query);

export const showsMapSelector = createSelector(showsStateSelector,(showState) => showState.entities);

export const showsLoadingSelector = createSelector(showsStateSelector,(showsState)=>showsState.loading);

export const queryShowsMapSelector = createSelector(showsStateSelector,(showState)=>showState.query_shows);

export const castsMapSelector = createSelector(showsStateSelector,(showstate)=>showstate.casts);

export const showsSelector = createSelector(showsMapSelector,showsQuerySelector,queryShowsMapSelector, (showsMap,query,queryShowsMap) => queryShowsMap[query]?.map((showid)=>showsMap[showid]));