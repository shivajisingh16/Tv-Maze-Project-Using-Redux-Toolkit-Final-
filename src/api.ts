import axios from "axios";
import { Show } from "./models/Show";

export const searchShowsandCasts = async (keyword: String) => {
  try{
  const response = await axios
    .get<{ show: Show }[]>("https://api.tvmaze.com/search/shows?q=" + keyword)
    .then((response) => response.data);
  let shows = response.map((item) => item.show);
  let casts = {};
  for (let i = 0; i < shows.length; i++) {
    const cast = await axios
      .get("https://api.tvmaze.com/shows/" + shows[i].id + "/cast")
      .then((response) => {
        return response.data.reduce((previous: any, current: any) => {
          return [
            ...previous,
            {
              id: current.person.id,
              name: current.person.name,
              image: { medium: current.person.image?.medium }
            },
          ];
        }, []);
      });
    casts = { ...casts, [shows[i].id]: cast };
  }

  return { shows: shows, casts: casts };
  }
  catch(error){
   const errorcode = (error as any).code;
   if(errorcode =="ERR_NETWORK"){
    alert("Network Error Occured! Check Your Internet Connection and Try Again Later.");
   }
   else{
    alert("Error Occured during fetching data! Try Again.");
   }
   return {shows:{},casts:{}};
  }
};

export const loadShowDetails = async (showId: number) => {
  try{
    const show = await axios
    .get("https://api.tvmaze.com/shows/" + showId)
    .then((respnse) => respnse.data);
    return show;
  }
  catch(error){
    const errorcode = (error as any).code;
    if(errorcode =="ERR_NETWORK"){
     alert("Network Error Occured! Check Your Internet Connection and Try Again Later.");
    }
    else{
     alert("Error Occured during fetching data! Try Again.");
    }
    return {};
  }

  //   console.log(typeof show);
  // return { id: show.id, image: { medium: show.image?.medium },name:show.name,genres:show.genres,rating:show.rating,summary:show.summary } ;
};

export const loadcastdetails = async (showid: number) => {
  try{
  const response = await axios
    .get("https://api.tvmaze.com/shows/" + showid + "/cast")
    .then((response) => response.data);
  const cast = await response.reduce((previous: any, current: any) => {
    return [
      ...previous,
      {
        id: current.person.id,
        name: current.person.name,
        image: { medium: current.person.image?.medium }
      },
    ];
  }, []);

  return cast;
}
catch(error){
  const errorcode = (error as any).code;
  if(errorcode =="ERR_NETWORK"){
   alert("Network Error Occured! Check Your Internet Connection and Try Again Later.");
  }
  else{
   alert("Error Occured during fetching data! Try Again.");
  }
  return [];
}
};
