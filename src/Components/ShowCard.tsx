import { Link } from "react-router-dom";
import { Cast, Show } from "../models/Show";
import { FC } from 'react';


type ShowCardProps = {
  show: Show;
}

export const placeHolder = "https://postshowrecaps.com/wp-content/uploads/2023/11/PSR_PLACEHOLDER_4_BATTLESTARGALACTICA_DTH-1-848x430.jpg";

const ShowCard: FC<ShowCardProps> = ({ show }) => {
  return (
    <div className="max-w-sm w-full rounded-lg shadow-lg overflow-hidden transform border-4 border-whitetransition-transform duration-300 hover:scale-105 hover:shadow-2xl mx-auto bg-black">
      <img
        src={show.image?.medium || placeHolder}
        alt={show.name}
        className="w-full h-56 object-contain object-center"
      />
       <div className="flex flex-col p-4 bg-black text-white justify-between h-60 gap-2">
        <h2 className="text-xl font-bold mb-2">{show.name}</h2>
        <p className="mb-4 line-clamp-5 overflow-y-scroll grow " dangerouslySetInnerHTML={{__html:show.summary! || "No description available."}}></p>
      
        <div className="mt-auto">
          <Link
            to={`/show/${show.id}`}
            className="block text-center text-blue-500 font-semibold border border-blue-500 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
