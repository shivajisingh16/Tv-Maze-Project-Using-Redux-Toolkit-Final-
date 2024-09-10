import { Cast, Show } from "../models/Show";
import { ActionCreator } from ".";
export const SHOWS_LOADED = "SHOWS_LOADED";

export const ShowsLoadedAction:ActionCreator <Show[]>=(shows:Show[])=>({
  type:SHOWS_LOADED,
  payload:shows,
})

export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE";

export const ShowsQueryChangeAction:ActionCreator <string>=(query:string)=>({
  type:SHOWS_QUERY_CHANGE,
  payload:query,
})


export const  SHOW_DETAIL_LOADED="SHOW_DETAIL_LOADED";

export const ShowDetailLoadedAction:ActionCreator<Show> = (show:Show) =>({
  type:SHOW_DETAIL_LOADED,
  payload:show,
});

export const SHOW_CAST_LOADED ="SHOW_CAST_LOADED";

export const showCastLoadedAction:ActionCreator<{casts:Cast[],showid:number}> = (showid:number,casts:Cast[])=>({
  type:SHOW_CAST_LOADED,
  payload:{showid:showid,casts:casts},
})

export const  LOAD_SHOW_ACTION="LOAD_SHOW_ACTION";

export const loadShowAction:ActionCreator<number> = (showId:number) =>({
  type:LOAD_SHOW_ACTION,
  payload:showId,
});



export const  CASTlOADEDACTION="CASTlOADEDACTION";

export const castLoadedAction:ActionCreator<any> = (casts:any) =>({
  type:CASTlOADEDACTION,
  payload:casts,
});

export const  LOAD_CAST_ACTION="LOAD_CAST_ACTION";

export const loadCastAction:ActionCreator<number> = (showId) =>({
  type:LOAD_CAST_ACTION,
  payload:showId
});