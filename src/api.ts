import axios from "axios";
import  {Show}  from "./models/Show";

export const searchShowsandCasts = async (keyword:String)=>{
  const shows = await axios.get<{show:Show}[]>("https://api.tvmaze.com/search/shows?q="+keyword)
  .then((response) => response.data.map((item) => item.show));
  let casts ={};
  for(let i=0;i<shows.length;i++){
    const cast = await axios.get("https://api.tvmaze.com/shows/"+shows[i].id+"/cast").then((response)=>{
      return response.data.reduce((previous:any,current:any)=>{
        return [...previous,{id:current.person.id,name:current.person.name,image:{medium:current.person.image?.medium}}]
      },[])
    })
    casts={...casts,[shows[i].id]:cast};
  }
  return {shows:shows,casts:casts};
}

// export const  getCasts = async (showId:number)=>{
//   let shows = await axios.get("https://api.tvmaze.com/search/shows")
//   let shows = await axios.get("https://api.tvmaze.com/search/shows/"+showId+"/casts")
// }
export const loadShowDetails=(showId:number)=>{
  return axios.get('https://api.tvmaze.com/shows/'+showId).then(respnse=>respnse.data)
}

export const loadcastdetails = (showid:number)=>{
  return axios.get("https://api.tvmaze.com/shows/"+showid+"/cast").then(response=>{
   
    const cast = response.data.reduce((previous:any,current:any)=>{
      return [...previous,{id:current.person.id,name:current.person.name,image:{medium:current.person.image?.medium}}]
    },[])
    return cast;
    
  }
  )

}