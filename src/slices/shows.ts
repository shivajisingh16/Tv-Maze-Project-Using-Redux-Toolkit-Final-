import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cast, Show } from "../models/Show";
import { normalize, schema } from "normalizr";

// export type State = {
//   shows: { [showId: number]: Show };
//   query_shows: { [query: string]: number[] };
//   query: string;
//   loading: boolean;
//   casts: { [castId: number]: Cast[] | undefined };
// };
// export const initialState: State = {
//   shows: {},
//   query_shows: {},
//   query: "",
//   loading: false,
//   casts: {},
// };
const showsAdapter = createEntityAdapter<Show>();

const initialState = showsAdapter.getInitialState({
  query_shows: {} as { [query: string]: number[] },
    query: "",
    loading: false,
    casts: {} as  { [castId: number]: Cast[] | undefined },
})

export type State = typeof initialState;



const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    showsLoaded,
    showsQueryChange,
    showDetailLoaded,
    showCastLoaded,
    castLoaded,
    loadShow,
    loadCast
  },
});

function showsLoaded(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  const showSchema = new schema.Entity("shows");
  const normalizedData = normalize(shows, [showSchema]);
  state.loading = false;
  state.query_shows[state.query] = normalizedData.result;
  state.entities = { ...state.entities, ...normalizedData.entities.shows };
}

function showsQueryChange(state: State, action: PayloadAction<string>) {

  state.query = action.payload;
  state.loading = true;
}

function showDetailLoaded(state: State, action: PayloadAction<Show>) {
  const show = action.payload;
  state.entities[show.id] = show;
  // console.log("band kardi")
  state.loading =false;
}

function showCastLoaded(state:State,action:PayloadAction<{casts:Cast[],showid:number}>){
  const cast =action.payload.casts

  state.casts[action.payload.showid]=cast;
}


function castLoaded(state:State,action:PayloadAction<{ [castId: number]: Cast[] | undefined }>){
  state.casts=action.payload;
}

function loadShow(state:State,action:PayloadAction<number>){
  state.loading =true;
}

function  loadCast(state:State,action:PayloadAction<number>){
  state.loading =true;
}


const { actions, reducer:showsReducer } = showsSlice;

export const {
  showsLoaded: ShowsLoadedAction,
  showsQueryChange: ShowsQueryChangeAction,
  showDetailLoaded: ShowDetailLoadedAction,
  showCastLoaded:showCastLoadedAction,
  castLoaded:castLoadedAction,
  loadShow:loadShowAction,
  loadCast:loadCastAction
} = actions;

export default showsReducer;