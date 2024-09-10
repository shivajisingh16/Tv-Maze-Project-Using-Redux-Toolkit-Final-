import {produce} from "immer";
import { AnyAction } from "redux";
import { Cast, Show } from "../models/Show";
import { CASTlOADEDACTION, SHOW_CAST_LOADED, SHOW_DETAIL_LOADED, SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/Shows";
import { normalize, schema } from 'normalizr';



export type State = {
  shows: {[showId:number]:Show};
  query_shows: {[query:string]:number[]};
  query:string;
  loading:boolean;
  casts:{[castId:number]:Cast | undefined};
};
export const initialState: State = {
  shows: {},
  query_shows:{},
  query:"",
  loading:false,
  casts:{},
};

function ShowReducer(state=initialState, action:AnyAction):State  {
  switch(action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft)=>{
        console.log(action.payload)
        const shows = action.payload as Show[];
        const showSchema = new schema.Entity("shows");
        const normalizedData = normalize(shows, [showSchema]);
        draft.loading=false;
        draft.query_shows[draft.query]=normalizedData.result;
        draft.shows = {...draft.shows, ...normalizedData.entities.shows};
      });
      case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        draft.query = action.payload;
        draft.loading =true;
      });
      case SHOW_DETAIL_LOADED:
        return produce(state,(draft)=>{
          const show = action.payload as Show;
          draft.shows[show.id]=show;
        })
      case SHOW_CAST_LOADED:
        return produce(state,(draft)=>{
          const cast =action.payload.casts as Cast;
          console.log("reducer",cast)
          draft.casts[action.payload.showid] =cast;
        })
      case CASTlOADEDACTION:
        return produce(state,(draft)=>{
          console.log(action.payload)
          draft.casts=action.payload;
        })
    default:
      return state;
  }
}

export default ShowReducer;